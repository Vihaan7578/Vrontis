import React, { useState, useEffect, useCallback, useRef } from 'react';

interface ElementState {
  element: HTMLElement;
  originalStyles: {
    position: string;
    left: string;
    top: string;
    width: string;
    height: string;
    fontSize: string;
    transform: string;
    zIndex: string;
    pointerEvents: string;
  };
  currentChanges: {
    x: number;
    y: number;
    scaleX: number;
    scaleY: number;
    fontSize: number;
  };
  type: 'text' | 'image';
  originalRect: DOMRect;
  isPermanentlyMoved: boolean;
}

interface SelectionRectangle {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isActive: boolean;
}

interface AdjusterStats {
  x: number;
  y: number;
  scalePercent: number;
  fontSizePercent?: number;
}

const ElementAdjusterSimple: React.FC = () => {
  const [selectedElements, setSelectedElements] = useState<ElementState[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string>('');
  const [selectionRect, setSelectionRect] = useState<SelectionRectangle>({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    isActive: false,
  });
  const [isSelectingWithRect, setIsSelectingWithRect] = useState(false);
  const [permanentlyMovedElements, setPermanentlyMovedElements] = useState<Map<HTMLElement, ElementState>>(new Map());
  const dragStartPos = useRef({ x: 0, y: 0 });
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const resizeStartSize = useRef({ width: 0, height: 0 });

  // Debug: Log when component mounts
  useEffect(() => {
    console.log('ElementAdjuster component mounted');
  }, []);

  // Find the most specific element at a point
  const findMostSpecificElement = (x: number, y: number): HTMLElement | null => {
    console.log('Finding element at:', x, y);
    
    // First, temporarily enable pointer events for elements that have them disabled
    const elementsWithDisabledPointers: { element: HTMLElement; originalStyle: string }[] = [];
    
    // Find all elements with pointer-events: none
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      const htmlEl = el as HTMLElement;
      const computedStyle = window.getComputedStyle(htmlEl);
      if (computedStyle.pointerEvents === 'none') {
        elementsWithDisabledPointers.push({
          element: htmlEl,
          originalStyle: htmlEl.style.pointerEvents || ''
        });
        htmlEl.style.pointerEvents = 'auto';
      }
    });
    
    // Now get elements at the point
    const elements = document.elementsFromPoint(x, y);
    console.log('Elements at point:', elements);
    
    // Restore original pointer events
    elementsWithDisabledPointers.forEach(({ element, originalStyle }) => {
      element.style.pointerEvents = originalStyle;
    });
    
    for (const element of elements) {
      const htmlElement = element as HTMLElement;
      
      // Skip the adjuster overlays
      if (htmlElement.closest('[data-adjuster-overlay]')) {
        console.log('Skipping adjuster overlay:', htmlElement);
        continue;
      }
      
      // Check if it's a valid selectable element
      const isTextElement = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'A', 'BUTTON', 'DIV'].includes(htmlElement.tagName);
      const isImageElement = htmlElement.tagName === 'IMG';
      
      console.log('Checking element:', htmlElement.tagName, htmlElement.textContent?.slice(0, 50), 'isText:', isTextElement, 'isImage:', isImageElement);
      
      // Special handling for hero text elements
      const isHeroText = htmlElement.textContent?.includes('VRONTIS') || 
                         htmlElement.textContent?.includes('MUN') || 
                         htmlElement.textContent?.includes('WHERE DIPLOMACY STRIKES BOLD');
      
      // Special handling for Pieta image
      const isPietaImage = htmlElement.tagName === 'IMG' && htmlElement.getAttribute('alt')?.includes('Pieta');
      
      if (isHeroText || isPietaImage) {
        console.log('Found hero/pieta element:', htmlElement);
        return htmlElement;
      }
      
      // For text elements, prefer the most specific text-containing element
      if (isTextElement && htmlElement.textContent && htmlElement.textContent.trim().length > 0) {
        // Check if this element has direct text content (not just inherited)
        const hasDirectText = Array.from(htmlElement.childNodes).some(
          node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()
        );
        
        console.log('Text element found:', htmlElement, 'hasDirectText:', hasDirectText);
        
        if (hasDirectText || htmlElement.children.length === 0) {
          console.log('Selecting text element:', htmlElement);
          return htmlElement;
        }
      }
      
      if (isImageElement) {
        console.log('Selecting image element:', htmlElement);
        return htmlElement;
      }
    }
    
    console.log('No suitable element found');
    return null;
  };

  // Select multiple elements
  const selectElements = (targets: HTMLElement[], addToSelection = false) => {
    console.log('Selecting elements:', targets, 'addToSelection:', addToSelection);
    
    let newSelectedElements = addToSelection ? [...selectedElements] : [];
    
    targets.forEach(target => {
      // Check if already selected
      if (newSelectedElements.some(el => el.element === target)) {
        return;
      }
      
      // Check if element is permanently moved
      const permanentState = permanentlyMovedElements.get(target);
      
      const rect = target.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(target);
      
      const originalStyles = {
        position: target.style.position || computedStyle.position,
        left: target.style.left || computedStyle.left,
        top: target.style.top || computedStyle.top,
        width: target.style.width || computedStyle.width,
        height: target.style.height || computedStyle.height,
        fontSize: target.style.fontSize || computedStyle.fontSize,
        transform: target.style.transform || computedStyle.transform,
        zIndex: target.style.zIndex || computedStyle.zIndex,
        pointerEvents: target.style.pointerEvents || computedStyle.pointerEvents,
      };
      
      // Make element positionable and interactable
      if (computedStyle.position === 'static') {
        target.style.position = 'relative';
      }
      target.style.zIndex = '9999';
      target.style.pointerEvents = 'auto';
      
      const isImageElement = target.tagName === 'IMG';
      
      const elementState: ElementState = {
        element: target,
        originalStyles,
        currentChanges: permanentState ? permanentState.currentChanges : {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          fontSize: parseFloat(computedStyle.fontSize) || 16,
        },
        type: isImageElement ? 'image' : 'text',
        originalRect: rect,
        isPermanentlyMoved: !!permanentState,
      };
      
      // Apply permanent changes if they exist
      if (permanentState) {
        const { x, y, scaleX, scaleY, fontSize } = permanentState.currentChanges;
        target.style.transform = `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`;
        if (elementState.type === 'text') {
          target.style.fontSize = `${fontSize}px`;
        }
      }
      
      newSelectedElements.push(elementState);
    });
    
    if (!addToSelection) {
      // Clear previous selection
      deselectAllElements();
    }
    
    setSelectedElements(newSelectedElements);
  };

  // Handle selection by rectangle - can select multiple elements
  const selectElementsInRect = (rect: SelectionRectangle) => {
    const { startX, startY, endX, endY } = rect;
    const left = Math.min(startX, endX);
    const top = Math.min(startY, endY);
    const right = Math.max(startX, endX);
    const bottom = Math.max(startY, endY);
    
    console.log('Looking for elements in rectangle:', left, top, right, bottom);
    
    // Find all elements that overlap with the rectangle
    const foundElements: HTMLElement[] = [];
    
    // Sample multiple points within the rectangle
    const steps = 5;
    for (let i = 0; i <= steps; i++) {
      for (let j = 0; j <= steps; j++) {
        const x = left + (right - left) * (i / steps);
        const y = top + (bottom - top) * (j / steps);
        
        const element = findMostSpecificElement(x, y);
        if (element && !foundElements.includes(element)) {
          foundElements.push(element);
        }
      }
    }
    
    console.log('Found elements in rectangle:', foundElements);
    
    if (foundElements.length > 0) {
      selectElements(foundElements);
    }
  };

  // Make elements permanently moved (middle mouse click)
  const makePermanent = () => {
    console.log('Making elements permanently moved');
    const newPermanentElements = new Map(permanentlyMovedElements);
    
    selectedElements.forEach(elementState => {
      const permanentState = { ...elementState, isPermanentlyMoved: true };
      newPermanentElements.set(elementState.element, permanentState);
    });
    
    setPermanentlyMovedElements(newPermanentElements);
    
    // Update selected elements to reflect permanent status
    const updatedElements = selectedElements.map(el => ({ ...el, isPermanentlyMoved: true }));
    setSelectedElements(updatedElements);
  };

  // Revert elements to original position (middle mouse double-click)
  const revertToOriginal = () => {
    console.log('Reverting elements to original position');
    const newPermanentElements = new Map(permanentlyMovedElements);
    
    selectedElements.forEach(elementState => {
      // Remove from permanent elements
      newPermanentElements.delete(elementState.element);
      
      // Reset element styles to original
      const { element, originalStyles } = elementState;
      Object.entries(originalStyles).forEach(([property, value]) => {
        if (property === 'pointerEvents') {
          element.style.pointerEvents = value;
        } else {
          (element.style as any)[property] = value;
        }
      });
    });
    
    setPermanentlyMovedElements(newPermanentElements);
    deselectAllElements();
  };

  // Deselect all elements
  const deselectAllElements = () => {
    selectedElements.forEach(({ element, originalStyles, isPermanentlyMoved }) => {
      if (!isPermanentlyMoved) {
        // Only restore styles if not permanently moved
        Object.entries(originalStyles).forEach(([property, value]) => {
          if (property === 'pointerEvents') {
            element.style.pointerEvents = value;
          } else {
            (element.style as any)[property] = value;
          }
        });
      }
    });
    
    setSelectedElements([]);
    setIsDragging(false);
    setIsResizing(false);
  };

  // Handle double-click on elements
  const handleDoubleClick = useCallback((event: MouseEvent) => {
    console.log('Double click detected at:', event.clientX, event.clientY);
    const target = findMostSpecificElement(event.clientX, event.clientY);
    console.log('Found target:', target);
    
    if (target) {
      selectElements([target]);
      event.stopPropagation();
      event.preventDefault();
    }
  }, []);

  // Handle middle mouse button events
  const handleMiddleMouseClick = useCallback((event: MouseEvent) => {
    if (event.button === 1) { // Middle mouse button
      event.preventDefault();
      
      if (selectedElements.length > 0) {
        console.log('Middle mouse click - making permanent');
        makePermanent();
      }
    }
  }, [selectedElements]);

  const handleMiddleMouseDoubleClick = useCallback((event: MouseEvent) => {
    if (event.button === 1) { // Middle mouse button
      event.preventDefault();
      
      if (selectedElements.length > 0) {
        console.log('Middle mouse double-click - reverting to original');
        revertToOriginal();
      }
    }
  }, [selectedElements]);

  // Handle mouse events for rectangle selection
  const handleMouseDownForSelection = useCallback((event: MouseEvent) => {
    console.log('Mouse down detected:', event.button, event.target);
    
    // Only start rectangle selection on left mouse button
    if (event.button !== 0) return;
    
    // Don't start if we're already interacting with a selected element
    if (selectedElements.length > 0) return;
    
    // Don't start if clicking on UI elements
    const target = event.target as HTMLElement;
    if (target.closest('[data-adjuster-overlay]') || target.closest('.fixed')) return;
    
    console.log('Starting rectangle selection');
    setIsSelectingWithRect(true);
    setSelectionRect({
      startX: event.clientX,
      startY: event.clientY,
      endX: event.clientX,
      endY: event.clientY,
      isActive: true,
    });
    
    event.preventDefault();
  }, [selectedElements]);

  const handleMouseMoveForSelection = useCallback((event: MouseEvent) => {
    if (!isSelectingWithRect) return;
    
    setSelectionRect(prev => ({
      ...prev,
      endX: event.clientX,
      endY: event.clientY,
    }));
  }, [isSelectingWithRect]);

  const handleMouseUpForSelection = useCallback((event: MouseEvent) => {
    if (!isSelectingWithRect) return;
    
    const rect = selectionRect;
    const width = Math.abs(rect.endX - rect.startX);
    const height = Math.abs(rect.endY - rect.startY);
    
    console.log('Selection rectangle completed:', rect, 'size:', width, height);
    
    // If the rectangle is too small, treat it as a click
    if (width < 5 && height < 5) {
      const target = findMostSpecificElement(event.clientX, event.clientY);
      if (target) {
        selectElements([target]);
      }
    } else {
      // Select element within the rectangle
      selectElementsInRect(rect);
    }
    
    setIsSelectingWithRect(false);
    setSelectionRect(prev => ({ ...prev, isActive: false }));
  }, [isSelectingWithRect, selectionRect]);

  // Add event listeners
  useEffect(() => {
    console.log('Setting up event listeners');
    
    const handleClick = (e: MouseEvent) => {
      if (selectedElements.length > 0 && !e.defaultPrevented) {
        deselectAllElements();
      }
    };
    
    document.addEventListener('dblclick', handleDoubleClick);
    document.addEventListener('mousedown', handleMouseDownForSelection);
    document.addEventListener('click', handleClick);
    document.addEventListener('mousedown', handleMiddleMouseClick);
    document.addEventListener('dblclick', handleMiddleMouseDoubleClick);
    
    return () => {
      console.log('Cleaning up event listeners');
      document.removeEventListener('dblclick', handleDoubleClick);
      document.removeEventListener('mousedown', handleMouseDownForSelection);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mousedown', handleMiddleMouseClick);
      document.removeEventListener('dblclick', handleMiddleMouseDoubleClick);
    };
  }, [handleDoubleClick, handleMouseDownForSelection, handleMiddleMouseClick, handleMiddleMouseDoubleClick, selectedElements]);

  // Add mouse move and up listeners for rectangle selection
  useEffect(() => {
    if (isSelectingWithRect) {
      document.addEventListener('mousemove', handleMouseMoveForSelection);
      document.addEventListener('mouseup', handleMouseUpForSelection);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMoveForSelection);
        document.removeEventListener('mouseup', handleMouseUpForSelection);
      };
    }
  }, [isSelectingWithRect, handleMouseMoveForSelection, handleMouseUpForSelection]);

  // Calculate stats for display (average of all selected elements)
  const getStats = (): AdjusterStats => {
    if (selectedElements.length === 0) return { x: 0, y: 0, scalePercent: 100 };
    
    const avgStats = selectedElements.reduce((acc, el) => {
      acc.x += el.currentChanges.x;
      acc.y += el.currentChanges.y;
      acc.scaleX += el.currentChanges.scaleX;
      acc.scaleY += el.currentChanges.scaleY;
      if (el.type === 'text') {
        acc.fontSize += el.currentChanges.fontSize;
        acc.textCount++;
      }
      return acc;
    }, { x: 0, y: 0, scaleX: 0, scaleY: 0, fontSize: 0, textCount: 0 });
    
    const count = selectedElements.length;
    const stats: AdjusterStats = {
      x: Math.round(avgStats.x / count),
      y: Math.round(avgStats.y / count),
      scalePercent: Math.round(((avgStats.scaleX + avgStats.scaleY) / 2 / count) * 100),
    };
    
    if (avgStats.textCount > 0) {
      const avgOriginalFontSize = selectedElements
        .filter(el => el.type === 'text')
        .reduce((sum, el) => sum + parseFloat(el.originalStyles.fontSize) || 16, 0) / avgStats.textCount;
      stats.fontSizePercent = Math.round((avgStats.fontSize / avgStats.textCount / avgOriginalFontSize) * 100);
    }
    
    return stats;
  };

  const stats = getStats();

  return (
    <>
      {/* Element Adjuster Active Indicator */}
      <div 
        data-adjuster-overlay
        className="fixed top-4 left-4 bg-green-600 text-white px-2 py-1 rounded text-xs z-[10000]"
      >
        Element Adjuster Active
      </div>

      {/* Selection Rectangle */}
      {selectionRect.isActive && (
        <div
          data-adjuster-overlay
          className="fixed pointer-events-none z-[9999]"
          style={{
            left: Math.min(selectionRect.startX, selectionRect.endX),
            top: Math.min(selectionRect.startY, selectionRect.endY),
            width: Math.abs(selectionRect.endX - selectionRect.startX),
            height: Math.abs(selectionRect.endY - selectionRect.startY),
            border: '2px solid #c99565',
            background: 'rgba(201, 149, 101, 0.2)',
          }}
        />
      )}

      {/* Stats Panel */}
      {selectedElements.length > 0 && (
        <div 
          data-adjuster-overlay
          className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg border border-yellow-600 z-[10000] font-mono text-sm"
        >
          <div className="mb-2 text-yellow-400 font-bold">
            Element Adjuster ({selectedElements.length} selected)
          </div>
          <div>X: {stats.x}px</div>
          <div>Y: {stats.y}px</div>
          <div>Scale: {stats.scalePercent}%</div>
          {stats.fontSizePercent && (
            <div>Font: {stats.fontSizePercent}%</div>
          )}
          <div className="mt-3 text-xs text-gray-300">
            <div>Hold & drag to select multiple</div>
            <div>Double-click to deselect</div>
            <div>Middle-click: Make permanent</div>
            <div>Middle-double-click: Revert</div>
            <div className="mt-1">
              {selectedElements.some(el => el.isPermanentlyMoved) && (
                <span className="text-green-400">● Permanent</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Selection Overlays for each selected element */}
      {selectedElements.map((elementState, index) => {
        const rect = elementState.element.getBoundingClientRect();
        return (
          <div
            key={index}
            data-adjuster-overlay
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: rect.left - 5,
              top: rect.top - 5,
              width: rect.width + 10,
              height: rect.height + 10,
              border: elementState.isPermanentlyMoved 
                ? '2px solid #10b981' 
                : '2px dashed #c99565',
              background: elementState.isPermanentlyMoved 
                ? 'rgba(16, 185, 129, 0.1)' 
                : 'rgba(201, 149, 101, 0.1)',
            }}
          >
            {/* Only show handles for the first selected element */}
            {index === 0 && (
              <>
                {/* Resize Handles */}
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 cursor-nw-resize pointer-events-auto" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 cursor-ne-resize pointer-events-auto" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-yellow-400 cursor-sw-resize pointer-events-auto" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 cursor-se-resize pointer-events-auto" />
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 cursor-n-resize pointer-events-auto" />
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 cursor-s-resize pointer-events-auto" />
                <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-yellow-400 cursor-w-resize pointer-events-auto" />
                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-yellow-400 cursor-e-resize pointer-events-auto" />
              </>
            )}
          </div>
        );
      })}
    </>
  );
};

export default ElementAdjusterSimple; 