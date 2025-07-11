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

const ElementAdjuster: React.FC = () => {
  const [selectedElements, setSelectedElements] = useState<ElementState[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string>('');
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
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

  // Select multiple elements
  const selectElements = (targets: HTMLElement[]) => {
    console.log('Selecting multiple elements:', targets);
    
    // Clear current selection first
    deselectAllElements();
    
    const newSelectedElements: ElementState[] = [];
    
    targets.forEach(target => {
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
    
    setSelectedElements(newSelectedElements);
  };

  // Select single element (for backward compatibility)
  const selectElement = (target: HTMLElement) => {
    selectElements([target]);
  };

  // Deselect all elements and restore original styles
  const deselectAllElements = useCallback(() => {
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
  }, [selectedElements]);



  // Handle double-click on elements
  const handleDoubleClick = useCallback((event: MouseEvent) => {
    console.log('Double click detected at:', event.clientX, event.clientY);
    const target = findMostSpecificElement(event.clientX, event.clientY);
    console.log('Found target:', target);
    
    if (target) {
      selectElement(target);
      event.stopPropagation();
      event.preventDefault();
    }
  }, []);

  // Handle mouse down for dragging
  const handleMouseDown = (event: React.MouseEvent, action: 'drag' | 'resize', handle?: string) => {
    if (!selectedElement) return;
    
    event.preventDefault();
    event.stopPropagation();
    
    if (action === 'drag') {
      setIsDragging(true);
      const rect = selectedElement.element.getBoundingClientRect();
      setDragOffset({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
      dragStartPos.current = { x: event.clientX, y: event.clientY };
    } else if (action === 'resize' && handle) {
      setIsResizing(true);
      setResizeHandle(handle);
      resizeStartPos.current = { x: event.clientX, y: event.clientY };
      const rect = selectedElement.element.getBoundingClientRect();
      resizeStartSize.current = { width: rect.width, height: rect.height };
    }
  };

  // Handle mouse move
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!selectedElement) return;
    
    if (isDragging) {
      const deltaX = event.clientX - dragStartPos.current.x;
      const deltaY = event.clientY - dragStartPos.current.y;
      
      const newChanges = {
        ...selectedElement.currentChanges,
        x: deltaX,
        y: deltaY,
      };
      
      selectedElement.element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${newChanges.scaleX}, ${newChanges.scaleY})`;
      
      setSelectedElement({
        ...selectedElement,
        currentChanges: newChanges,
      });
    } else if (isResizing) {
      const deltaX = event.clientX - resizeStartPos.current.x;
      const deltaY = event.clientY - resizeStartPos.current.y;
      
      let scaleX = selectedElement.currentChanges.scaleX;
      let scaleY = selectedElement.currentChanges.scaleY;
      
      if (resizeHandle.includes('right')) {
        scaleX = Math.max(0.1, (resizeStartSize.current.width + deltaX) / selectedElement.originalRect.width);
      }
      if (resizeHandle.includes('left')) {
        scaleX = Math.max(0.1, (resizeStartSize.current.width - deltaX) / selectedElement.originalRect.width);
      }
      if (resizeHandle.includes('bottom')) {
        scaleY = Math.max(0.1, (resizeStartSize.current.height + deltaY) / selectedElement.originalRect.height);
      }
      if (resizeHandle.includes('top')) {
        scaleY = Math.max(0.1, (resizeStartSize.current.height - deltaY) / selectedElement.originalRect.height);
      }
      
      const newChanges = {
        ...selectedElement.currentChanges,
        scaleX,
        scaleY,
      };
      
      selectedElement.element.style.transform = `translate(${newChanges.x}px, ${newChanges.y}px) scale(${scaleX}, ${scaleY})`;
      
      setSelectedElement({
        ...selectedElement,
        currentChanges: newChanges,
      });
    }
  }, [selectedElement, isDragging, isResizing, resizeHandle]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle('');
  }, []);

  // Handle font size change for text elements
  const handleFontSizeChange = (delta: number) => {
    if (!selectedElement || selectedElement.type !== 'text') return;
    
    const newFontSize = Math.max(8, selectedElement.currentChanges.fontSize + delta);
    selectedElement.element.style.fontSize = `${newFontSize}px`;
    
    setSelectedElement({
      ...selectedElement,
      currentChanges: {
        ...selectedElement.currentChanges,
        fontSize: newFontSize,
      },
    });
  };

  // Handle mouse events for rectangle selection
  const handleMouseDownForSelection = useCallback((event: MouseEvent) => {
    console.log('Mouse down detected:', event.button, event.target);
    
    // Only start rectangle selection on left mouse button
    if (event.button !== 0) return;
    
    // Don't start if we're already interacting with a selected element
    if (selectedElement) return;
    
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
  }, []);

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
        selectElement(target);
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
      if (selectedElement && !e.defaultPrevented) {
        deselectElement();
      }
    };
    
    document.addEventListener('dblclick', handleDoubleClick);
    document.addEventListener('mousedown', handleMouseDownForSelection);
    document.addEventListener('click', handleClick);
    
    return () => {
      console.log('Cleaning up event listeners');
      document.removeEventListener('dblclick', handleDoubleClick);
      document.removeEventListener('mousedown', handleMouseDownForSelection);
      document.removeEventListener('click', handleClick);
    };
  }, [handleDoubleClick, handleMouseDownForSelection]);

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

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  // Calculate stats for display
  const getStats = (): AdjusterStats => {
    if (!selectedElement) return { x: 0, y: 0, scalePercent: 100 };
    
    const stats: AdjusterStats = {
      x: Math.round(selectedElement.currentChanges.x),
      y: Math.round(selectedElement.currentChanges.y),
      scalePercent: Math.round(((selectedElement.currentChanges.scaleX + selectedElement.currentChanges.scaleY) / 2) * 100),
    };
    
    if (selectedElement.type === 'text') {
      const originalFontSize = parseFloat(selectedElement.originalStyles.fontSize) || 16;
      stats.fontSizePercent = Math.round((selectedElement.currentChanges.fontSize / originalFontSize) * 100);
    }
    
    return stats;
  };

  const stats = selectedElement ? getStats() : { x: 0, y: 0, scalePercent: 100 };

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
      {selectedElement && (
        <div 
          data-adjuster-overlay
          className="fixed top-4 right-4 bg-black/90 text-white p-4 rounded-lg border border-yellow-600 z-[10000] font-mono text-sm"
        >
          <div className="mb-2 text-yellow-400 font-bold">Element Adjuster</div>
          <div>X: {stats.x}px</div>
          <div>Y: {stats.y}px</div>
          <div>Scale: {stats.scalePercent}%</div>
          {stats.fontSizePercent && (
            <div>Font: {stats.fontSizePercent}%</div>
          )}
          <div className="mt-3 text-xs text-gray-300">
            <div>Hold & drag to select</div>
            <div>Double-click to deselect</div>
            <div>Drag to move</div>
            <div>Use corners to resize</div>
            {selectedElement.type === 'text' && (
              <div className="mt-2">
                <button
                  onClick={() => handleFontSizeChange(2)}
                  className="bg-yellow-600 text-black px-2 py-1 rounded mr-1 text-xs"
                >
                  A+
                </button>
                <button
                  onClick={() => handleFontSizeChange(-2)}
                  className="bg-yellow-600 text-black px-2 py-1 rounded text-xs"
                >
                  A-
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Selection Overlay */}
      {selectedElement && (
        <div
          data-adjuster-overlay
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: selectedElement.element.getBoundingClientRect().left - 5,
            top: selectedElement.element.getBoundingClientRect().top - 5,
            width: selectedElement.element.getBoundingClientRect().width + 10,
            height: selectedElement.element.getBoundingClientRect().height + 10,
            border: '2px dashed #c99565',
            background: 'rgba(201, 149, 101, 0.1)',
          }}
        >
          {/* Drag Handle */}
          <div
            className="absolute inset-0 cursor-move pointer-events-auto"
            onMouseDown={(e) => handleMouseDown(e, 'drag')}
          />

          {/* Resize Handles */}
          <div
            className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-400 cursor-nw-resize pointer-events-auto"
            onMouseDown={(e) => handleMouseDown(e, 'resize', 'top-left')}
          />
          <div
            className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 cursor-ne-resize pointer-events-auto"
            onMouseDown={(e) => handleMouseDown(e, 'resize', 'top-right')}
          />
          <div
            className="absolute -bottom-1 -left-1 w-3 h-3 bg-yellow-400 cursor-sw-resize pointer-events-auto"
            onMouseDown={(e) => handleMouseDown(e, 'resize', 'bottom-left')}
          />
          <div
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 cursor-se-resize pointer-events-auto"
            onMouseDown={(e) => handleMouseDown(e, 'resize', 'bottom-right')}
          />
          
          {/* Side handles */}
          <div
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 cursor-n-resize pointer-events-auto"
            onMouseDown={(e) => handleMouseDown(e, 'resize', 'top')}
          />
          <div
            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 cursor-s-resize pointer-events-auto"
            onMouseDown={(e) => handleMouseDown(e, 'resize', 'bottom')}
          />
          <div
            className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-yellow-400 cursor-w-resize pointer-events-auto"
            onMouseDown={(e) => handleMouseDown(e, 'resize', 'left')}
          />
          <div
            className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-yellow-400 cursor-e-resize pointer-events-auto"
            onMouseDown={(e) => handleMouseDown(e, 'resize', 'right')}
          />
        </div>
      )}
    </>
  );
};

export default ElementAdjuster; 