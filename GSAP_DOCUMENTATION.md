# GSAP (GreenSock Animation Platform) Documentation
*A Simple Guide to Professional Web Animations*

## What is GSAP?

GSAP is a JavaScript animation library that makes it easy to animate anything on your website. Think of it as the "Swiss Army knife" of web animations - it's powerful, fast, and works everywhere.

## Why Use GSAP?

- **Faster than CSS animations** - GSAP is optimized for performance
- **Works everywhere** - Compatible with all browsers, even old ones
- **Smooth animations** - No janky movements or stuttering
- **Easy to learn** - Simple syntax that makes sense
- **Professional grade** - Used by companies like Google, Adobe, and Netflix

---

## Basic Animation Methods

### 1. `gsap.to()` - Animate TO a destination
This moves an element FROM its current position TO where you want it to go.

```javascript
// Move a box 100 pixels to the right over 2 seconds
gsap.to(".box", {
  x: 100,        // Move 100px right
  duration: 2    // Take 2 seconds
});

// Fade out an element
gsap.to(".element", {
  opacity: 0,    // Fade to invisible
  duration: 1    // Over 1 second
});
```

### 2. `gsap.from()` - Animate FROM a starting point
This sets where the animation starts FROM and moves to the element's current position.

```javascript
// Element slides in from the left
gsap.from(".title", {
  x: -200,       // Start 200px to the left
  duration: 1    // Slide in over 1 second
});

// Element fades in from invisible
gsap.from(".card", {
  opacity: 0,    // Start invisible
  y: 50,         // Start 50px down
  duration: 0.8  // Animate for 0.8 seconds
});
```

### 3. `gsap.fromTo()` - Complete control
You set both the starting point AND the ending point.

```javascript
// Element grows and moves
gsap.fromTo(".button", 
  // FROM (starting state)
  { 
    scale: 0.5,   // Start at half size
    x: -100       // Start 100px left
  },
  // TO (ending state)
  { 
    scale: 1,     // End at normal size
    x: 0,         // End at original position
    duration: 1.5 // Take 1.5 seconds
  }
);
```

### 4. `gsap.set()` - Set properties instantly
Changes properties immediately without animation.

```javascript
// Position elements instantly
gsap.set(".popup", {
  x: 100,
  y: 50,
  opacity: 0
});
```

---

## Properties You Can Animate

### Position & Movement
```javascript
gsap.to(".element", {
  x: 100,          // Move right (pixels)
  y: -50,          // Move up (pixels)
  left: "200px",   // CSS left property
  top: "100px"     // CSS top property
});
```

### Size & Scale
```javascript
gsap.to(".element", {
  scale: 1.5,      // Make 1.5x bigger
  scaleX: 2,       // Stretch horizontally
  scaleY: 0.5,     // Squash vertically
  width: "300px",  // Change width
  height: "200px"  // Change height
});
```

### Rotation
```javascript
gsap.to(".element", {
  rotation: 360,   // Spin full circle
  rotationX: 45,   // Flip on X-axis
  rotationY: 90    // Flip on Y-axis
});
```

### Appearance
```javascript
gsap.to(".element", {
  opacity: 0.5,           // Semi-transparent
  backgroundColor: "red", // Change color
  borderRadius: "50%"     // Make circular
});
```

---

## Timeline - Multiple Animations in Sequence

A timeline lets you control multiple animations like a movie director controls scenes.

### Basic Timeline
```javascript
// Create a timeline
const tl = gsap.timeline();

// Add animations one after another
tl.to(".title", { opacity: 1, duration: 1 })
  .to(".subtitle", { y: 0, duration: 0.5 })
  .to(".button", { scale: 1, duration: 0.3 });
```

### Timeline with Delays
```javascript
const tl = gsap.timeline();

tl.to(".box1", { x: 100, duration: 1 })
  .to(".box2", { y: 100, duration: 1 }, "-=0.5")  // Start 0.5s before previous ends
  .to(".box3", { rotation: 360, duration: 1 }, "+=0.2"); // Start 0.2s after previous ends
```

### Timeline Controls
```javascript
const tl = gsap.timeline({ paused: true }); // Start paused

// Control the timeline
tl.play();     // Start playing
tl.pause();    // Pause
tl.reverse();  // Play backwards
tl.restart();  // Start from beginning
```

---

## Easing (How Animations Move)

Easing controls the "feel" of your animation - whether it's bouncy, smooth, or snappy.

### Common Easing Types
```javascript
// Smooth and natural
gsap.to(".element", { x: 100, ease: "power2.out" });

// Bouncy
gsap.to(".element", { y: 100, ease: "bounce.out" });

// Elastic (rubber band effect)
gsap.to(".element", { scale: 1.2, ease: "elastic.out" });

// Back (overshoots then settles)
gsap.to(".element", { rotation: 90, ease: "back.out(1.7)" });
```

### Easing Categories
- **power1, power2, power3, power4** - Smooth acceleration/deceleration
- **bounce** - Bouncing ball effect
- **elastic** - Rubber band effect
- **back** - Overshoots target then settles
- **circ** - Circular motion feel
- **expo** - Exponential acceleration

### Easing Directions
- **`.in`** - Slow start, fast end
- **`.out`** - Fast start, slow end
- **`.inOut`** - Slow start and end, fast middle

---

## Advanced Features

### Stagger (Animate Multiple Elements)
```javascript
// Animate multiple elements with delay between each
gsap.to(".card", {
  y: -20,
  duration: 0.5,
  stagger: 0.1  // 0.1 second delay between each card
});

// Random stagger
gsap.to(".particle", {
  x: "random(-100, 100)",
  stagger: {
    amount: 1,     // Total time for all staggers
    from: "random" // Start from random element
  }
});
```

### ScrollTrigger (Animate on Scroll)
```javascript
gsap.registerPlugin(ScrollTrigger);

gsap.to(".reveal", {
  opacity: 1,
  y: 0,
  scrollTrigger: {
    trigger: ".reveal",
    start: "top 80%",    // When top of element hits 80% down the viewport
    end: "bottom 20%",   // When bottom of element hits 20% down the viewport
    toggleActions: "play none none reverse"
  }
});
```

### MotionPath (Animate Along a Path)
```javascript
gsap.registerPlugin(MotionPathPlugin);

gsap.to(".rocket", {
  duration: 5,
  motionPath: {
    path: "#path",        // SVG path element
    autoRotate: true      // Rotate to face direction
  }
});
```

---

## Practical Examples

### 1. Card Hover Effect
```javascript
// When mouse enters
function cardHover() {
  gsap.to(this, {
    y: -10,
    scale: 1.05,
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
    duration: 0.3,
    ease: "power2.out"
  });
}

// When mouse leaves
function cardLeave() {
  gsap.to(this, {
    y: 0,
    scale: 1,
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    duration: 0.3,
    ease: "power2.out"
  });
}
```

### 2. Loading Animation
```javascript
const tl = gsap.timeline({ repeat: -1 }); // Repeat forever

tl.to(".loader", { rotation: 360, duration: 1, ease: "none" })
  .to(".loader", { scale: 1.2, duration: 0.5, yoyo: true, repeat: 1 });
```

### 3. Text Reveal
```javascript
// Split text into individual letters
const text = new SplitText(".title", { type: "chars" });

// Animate each letter
gsap.from(text.chars, {
  opacity: 0,
  y: 50,
  rotation: 10,
  duration: 0.8,
  ease: "back.out(1.7)",
  stagger: 0.05
});
```

### 4. Page Transition
```javascript
function pageTransition() {
  const tl = gsap.timeline();
  
  // Fade out current content
  tl.to(".current-page", { opacity: 0, y: -50, duration: 0.5 })
    // Load new content (happens instantly)
    .call(loadNewContent)
    // Fade in new content
    .fromTo(".new-page", 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5 }
    );
}
```

---

## Performance Tips

### 1. Use Transform Properties
```javascript
// GOOD - Uses GPU acceleration
gsap.to(".element", { x: 100, y: 50, scale: 1.2 });

// AVOID - Forces reflow/repaint
gsap.to(".element", { left: "100px", top: "50px", width: "200px" });
```

### 2. Set will-change CSS Property
```css
.animated-element {
  will-change: transform, opacity;
}
```

### 3. Use Force3D for Complex Animations
```javascript
gsap.to(".element", {
  x: 100,
  force3D: true,  // Forces hardware acceleration
  duration: 1
});
```

---

## Common Patterns

### 1. Reveal on Scroll
```javascript
gsap.utils.toArray(".reveal").forEach(element => {
  gsap.fromTo(element, 
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: "top 80%"
      }
    }
  );
});
```

### 2. Counter Animation
```javascript
function animateCounter(element, endValue) {
  const obj = { value: 0 };
  
  gsap.to(obj, {
    value: endValue,
    duration: 2,
    onUpdate: function() {
      element.textContent = Math.round(obj.value);
    }
  });
}
```

### 3. Parallax Effect
```javascript
gsap.to(".background", {
  yPercent: -50,
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    start: "top bottom",
    end: "bottom top",
    scrub: true  // Links animation to scroll position
  }
});
```

---

## Best Practices

### 1. Always Set Duration
```javascript
// GOOD
gsap.to(".element", { x: 100, duration: 1 });

// BAD (uses default duration)
gsap.to(".element", { x: 100 });
```

### 2. Use Relative Values When Possible
```javascript
// GOOD - Works on any screen size
gsap.to(".element", { x: "50vw", y: "25%" });

// OKAY - Fixed values
gsap.to(".element", { x: 500, y: 200 });
```

### 3. Clean Up Animations
```javascript
// Store animation reference
const animation = gsap.to(".element", { x: 100, duration: 1 });

// Kill animation when component unmounts
animation.kill();
```

### 4. Test Performance
```javascript
// Monitor performance
gsap.ticker.add(() => {
  // Check if frame rate drops
  console.log('FPS:', gsap.ticker.fps);
});
```

---

## Quick Reference

### Essential Properties
- `x, y` - Move horizontally/vertically
- `scale` - Resize (1 = normal, 2 = double, 0.5 = half)
- `rotation` - Rotate in degrees
- `opacity` - Transparency (0 = invisible, 1 = solid)
- `duration` - How long animation takes
- `delay` - Wait before starting
- `ease` - Animation curve/feel

### Essential Methods
- `gsap.to()` - Animate to target values
- `gsap.from()` - Animate from starting values
- `gsap.timeline()` - Chain multiple animations
- `gsap.set()` - Set values instantly

### Essential Timeline Methods
- `.play()` - Start/resume
- `.pause()` - Stop
- `.reverse()` - Play backwards
- `.restart()` - Start from beginning
- `.kill()` - Stop and clean up

---

*This documentation covers the most commonly used GSAP features. For advanced usage, refer to the official GSAP documentation at gsap.com* 