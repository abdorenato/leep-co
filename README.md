# Leep Co Design System

This document outlines the design system for the Leep Co project, focusing on consistent spacing, sizing, and responsive utility classes.

## Spacing System

The spacing system provides consistent units for padding, margin, gap, and other spatial properties across the application.

### Base Spacing Units

The base spacing units are defined in `tailwind.config.ts` as fractional and integer rem values:

| Token | Value | Pixels (approx) |
|-------|-------|----------------|
| 0.25  | 0.0625rem | 1px |
| 0.75  | 0.1875rem | 3px |
| 1     | 0.25rem   | 4px |
| 1.25  | 0.3125rem | 5px |
| 1.5   | 0.375rem  | 6px |
| 1.75  | 0.4375rem | 7px |
| 2     | 0.5rem    | 8px |
| 2.25  | 0.5625rem | 9px |
| 2.5   | 0.625rem  | 10px |
| 2.75  | 0.6875rem | 11px |
| 3     | 0.75rem   | 12px |
| 3.25  | 0.8125rem | 13px |
| 3.5   | 0.875rem  | 14px |
| 3.75  | 0.9375rem | 15px |
| 4     | 1rem      | 16px |
| 4.5   | 1.125rem  | 18px |
| 5     | 1.25rem   | 20px |
| 5.5   | 1.375rem  | 22px |
| 6     | 1.5rem    | 24px |
| 6.5   | 1.625rem  | 26px |
| 7     | 1.75rem   | 28px |
| 7.5   | 1.875rem  | 30px |
| 8     | 2rem      | 32px |
| 8.5   | 2.125rem  | 34px |
| 9     | 2.25rem   | 36px |
| 9.5   | 2.375rem  | 38px |
| 10    | 2.5rem    | 40px |
| 10.5  | 2.625rem  | 42px |
| 11    | 2.75rem   | 44px |
| 11.5  | 2.875rem  | 46px |
| 12    | 3rem      | 48px |
| 13    | 3.25rem   | 52px |
| 14    | 3.5rem    | 56px |
| 15    | 3.75rem   | 60px |
| 16    | 4rem      | 64px |

... and additional larger units (17-120).

## Responsive Padding & Margin Classes

These utility classes provide consistent spacing that adapts across different screen sizes.

### Padding Classes

```css
.padding-x {
  @apply px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12;
}

.padding-y {
  @apply py-4 sm:py-6 md:py-8 lg:py-10 xl:py-12;
}

.padding {
  @apply padding-x padding-y;
}

.section-padding {
  @apply py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20;
}
```

### Margin Classes

```css
.mb-section {
  @apply mb-10 sm:mb-12 md:mb-16 lg:mb-20 xl:mb-24;
}

.mt-section {
  @apply mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24;
}

.my-section {
  @apply my-10 sm:my-12 md:my-16 lg:my-20 xl:my-24;
}

.mb-element {
  @apply mb-4 sm:mb-5 md:mb-6 lg:mb-8;
}

.mt-element {
  @apply mt-4 sm:mt-5 md:mt-6 lg:mt-8;
}

.my-element {
  @apply my-4 sm:my-5 md:my-6 lg:my-8;
}

.gap-element {
  @apply gap-4 sm:gap-5 md:gap-6 lg:gap-8;
}
```

## Container & Layout Classes

```css
.container-width {
  @apply max-w-7xl mx-auto;
}

.container-xs {
  @apply max-w-xs mx-auto;
}

.container-sm {
  @apply max-w-sm mx-auto;
}

.container-md {
  @apply max-w-md mx-auto;
}

.container-lg {
  @apply max-w-lg mx-auto;
}

.container-xl {
  @apply max-w-xl mx-auto;
}

/* ... more container classes ... */
```

## Flex Helper Classes

```css
.flex-center {
  @apply flex items-center justify-center;
}

.flex-between {
  @apply flex items-center justify-between;
}
```

## Icon Size Classes

```css
.icon-size-sm {
  @apply w-4 h-4;
}

.icon-size {
  @apply w-5 h-5;
}

.icon-size-lg {
  @apply w-6 h-6;
}

.icon-size-xl {
  @apply w-8 h-8;
}
```

## Responsive Breakpoints

| Breakpoint | Width   |
|------------|---------|
| xs         | 480px   |
| sm         | 640px   |
| md         | 768px   |
| lg         | 1024px  |
| xl         | 1280px  |
| 2xl        | 1536px  |
| 3xl        | 1920px  |

## Button Sizing System

| Size      | Height | Padding     | Text Size |
|-----------|--------|-------------|-----------|
| xs        | h-8    | px-2.5 py-1.5 | text-xs |
| sm        | h-9    | px-3.5 py-2   | text-sm |
| default   | h-10   | px-4.5 py-2.5 | text-sm |
| lg        | h-11   | px-6.5 py-3   | text-base |
| xl        | h-12   | px-8 py-3.5   | text-base |
| icon      | h-10 w-10 | p-2.5     | - |
| icon-sm   | h-8 w-8   | p-1.75    | - |
| icon-lg   | h-11 w-11 | p-3       | - |

## Usage Examples

### Section Layout

```jsx
<section className="section-padding">
  <div className="container-width">
    <h2 className="mb-element">Section Title</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-element">
      {/* Content */}
    </div>
  </div>
</section>
```

### Card Component

```jsx
<div className="rounded-lg shadow-md p-4 sm:p-5 md:p-6">
  <h3 className="mb-2.5">Card Title</h3>
  <p>Card content goes here</p>
  <div className="mt-4.5 flex-between">
    <Button size="sm">Action</Button>
    <span className="flex-center">
      <Icon className="icon-size" />
    </span>
  </div>
</div>
``` 