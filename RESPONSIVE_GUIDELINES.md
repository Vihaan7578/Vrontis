# Responsive Design Guidelines for Vrontis MUN

## Overview
This document outlines the responsive design system implemented across the Vrontis MUN website to ensure consistent, beautiful layouts across all device sizes.

## Key Improvements Made

### 1. **Hero Section (InteractiveHeroText)**
**Before:** Complex JavaScript calculations with double scaling, magic numbers, and inconsistent positioning.

**After:** 
- Clean CSS-based layout using Tailwind utilities
- Single source of truth for sizing with `clamp()` functions
- Text and image scale together as a cohesive unit
- Proper aspect ratio maintenance

**Breakpoint Strategy:**
- **Mobile (< 640px):** Compact layout, smaller text, image takes 50% width
- **Tablet (640px - 1024px):** Medium layout, balanced proportions
- **Desktop (> 1024px):** Full layout, maximum visual impact

### 2. **Responsive Sizing System**

#### Text Sizing (using `clamp()`)
```
Mobile:   clamp(4rem, 10vw, 12rem)  → VRONTIS
Desktop:  clamp(6rem, 12vw, 16rem)  → VRONTIS

Mobile:   clamp(4.5rem, 11vw, 13rem) → MUN
Desktop:  clamp(7rem, 14vw, 18rem)   → MUN

Tagline:  clamp(0.75rem, 1.5vw, 1.25rem) → Mobile
          clamp(1rem, 1.8vw, 1.5rem)     → Desktop
```

#### Image Sizing (viewport-based)
```
Mobile:   w-[50vw] h-[60vh]
Tablet:   w-[42vw] h-[80vh]
Desktop:  w-[35vw] h-[95vh]
```

### 3. **Layout Positioning**

**Text Container:**
- Left-aligned with responsive padding: `left-4 sm:left-8 md:left-12 lg:left-16`
- Vertically centered: `top-1/2 -translate-y-1/2`
- Max width prevents overflow: `max-w-[90vw] sm:max-w-[55vw]`

**Image Container:**
- Right-aligned, bottom-anchored: `right-0 bottom-0`
- Scales proportionally with viewport
- Maintains aspect ratio: `object-contain`

### 4. **Tailwind Breakpoints**
```javascript
'xs': '475px'   // Extra small phones
'sm': '640px'   // Small tablets
'md': '768px'   // Tablets
'lg': '1024px'  // Small laptops
'xl': '1280px'  // Desktops
'2xl': '1536px' // Large displays
```

## Testing Different Screen Sizes

### Recommended Test Sizes:
1. **Mobile Portrait:** 375x667 (iPhone SE)
2. **Mobile Landscape:** 667x375
3. **Tablet Portrait:** 768x1024 (iPad)
4. **Tablet Landscape:** 1024x768
5. **Laptop:** 1366x768
6. **Desktop:** 1920x1080
7. **Large Desktop:** 2560x1440
8. **Ultrawide:** 3440x1440

### Testing Commands:
```bash
# Run dev server
npm run dev

# Test in different viewports (Chrome DevTools)
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test responsive breakpoints
```

## Common Responsive Patterns

### 1. **Flex to Stack Pattern**
```jsx
<div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
  {/* Content */}
</div>
```

### 2. **Grid Responsive Pattern**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

### 3. **Text Responsive Pattern**
```jsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Heading
</h1>
```

### 4. **Padding/Margin Responsive Pattern**
```jsx
<div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
  {/* Content */}
</div>
```

## Fixes for Common Issues

### Issue 1: Text and Image Scale Differently
**Solution:** Group them in a container and use relative units (vw, vh, clamp)

### Issue 2: Layout Breaks at Specific Sizes
**Solution:** Test at all breakpoints and use intermediate values

### Issue 3: Text Too Large/Small
**Solution:** Use `clamp(min, preferred, max)` for fluid typography

### Issue 4: Inconsistent Spacing
**Solution:** Use Tailwind's spacing scale consistently

### Issue 5: Content Overflow
**Solution:** Use `max-w-[...]` and `overflow-hidden` strategically

## Additional Recommendations

### 1. **Use Container Queries (Future)**
When browser support improves, consider container queries for component-level responsiveness.

### 2. **Test on Real Devices**
Simulators are good, but test on actual phones/tablets for touch interactions.

### 3. **Monitor Performance**
- Use Chrome Lighthouse for performance audits
- Check Core Web Vitals (LCP, FID, CLS)
- Optimize images for different screen sizes

### 4. **Accessibility Considerations**
- Minimum touch target: 44x44px
- Readable font sizes (16px minimum)
- Proper contrast ratios
- Test with screen readers

## Maintenance Tips

1. **Always test changes across all breakpoints**
2. **Use Tailwind utilities instead of custom CSS when possible**
3. **Keep `clamp()` values documented**
4. **Avoid magic numbers - use design system values**
5. **Mobile-first approach - start small and scale up**

## Resources

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [CSS Clamp Calculator](https://clamp.font-size.app/)
- [Responsive Design Checker](https://responsivedesignchecker.com/)
- [Chrome DevTools Device Mode](https://developer.chrome.com/docs/devtools/device-mode/)

---

**Last Updated:** 2025-01-22
**Maintainer:** Vrontis MUN Development Team

