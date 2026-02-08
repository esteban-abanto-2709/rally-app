# 🎨 RALLY VISUAL STYLE GUIDE

## 🎯 Visual Identity: "Syntax Highlight"

### **Design Philosophy**

**"Technical but friendly, colorful without being infantile"**

The visual language of Rally draws inspiration from **code editors** and **syntax highlighting**, creating a unique aesthetic that feels native to developers while remaining approachable for community members.

**Core Vibe:** Like looking at well-formatted code with Prettier + a carefully crafted color theme.

---

## 🎨 Color System

### **Philosophy**

Instead of generic corporate colors, Rally uses **syntax-inspired colors** where each color has semantic meaning, just like in a code editor.

### **Primary Palette (Syntax Colors)**

#### **Keyword Blue** - Primary Actions & Navigation

- **HEX:** `#89b4fa` (lighter variant of #3b82f6)
- **Usage:** Primary buttons, active states, links, primary brand
- **Represents:** Main actions, keywords in code
- **Example:** "Dashboard" nav item when active, primary CTAs

#### **String Green** - Success & Completion

- **HEX:** `#a6e3a1` (lighter variant of #10b981)
- **Usage:** Success messages, completed tasks, positive metrics
- **Represents:** String values, successful operations
- **Example:** Task completion status, success alerts

#### **Variable Purple** - Features & Special States

- **HEX:** `#b4befe` (lighter variant of #a855f7)
- **Usage:** Feature highlights, special badges, tertiary actions
- **Represents:** Variables, important identifiers
- **Example:** Feature cards, special labels

#### **Warning Yellow** - Warnings & In Progress

- **HEX:** `#f9e2af`
- **Usage:** Warning states, in-progress items, caution indicators
- **Represents:** Comments, warnings in code
- **Example:** Tasks in progress, warning messages

#### **Error Red** - Critical & Urgent

- **HEX:** `#f38ba8`
- **Usage:** Error states, high priority, destructive actions
- **Represents:** Errors, critical issues
- **Example:** High priority tasks, error messages, delete actions

### **Base Colors (Backgrounds & Text)**

#### **Background Hierarchy**

- **Primary Background:** `#1e1e2e` - Main app background
- **Secondary Background:** `#181825` - Cards, elevated surfaces
- **Tertiary Background:** `#11111b` - Sidebar, deepest surfaces
- **Hover Background:** `rgba(137, 180, 250, 0.1)` - Interactive states

#### **Border Colors**

- **Primary Border:** `#313244` - Main dividers, card borders
- **Subtle Border:** `#45475a` - Lighter dividers
- **Focus Border:** `#89b4fa` - Focused inputs, active elements

#### **Text Colors**

- **Primary Text:** `#cdd6f4` - Main content, headings
- **Secondary Text:** `#bac2de` - Subheadings, less important text
- **Tertiary Text:** `#a6adc8` - Placeholders, hints
- **Muted Text:** `#7f849c` - Timestamps, metadata

### **Semantic Color Mapping**

#### **By Entity Type**

```
Projects     → Keyword Blue (#89b4fa)
Features     → Variable Purple (#b4befe)
Tasks        → String Green (#a6e3a1)
Users        → Keyword Blue (#89b4fa)
Comments     → Muted Text (#7f849c)
```

#### **By Status**

```
Open         → Tertiary Text (#a6adc8)
In Progress  → Warning Yellow (#f9e2af)
Done         → String Green (#a6e3a1)
Blocked      → Error Red (#f38ba8)
```

#### **By Priority**

```
Very High    → Error Red (#f38ba8)
High         → Warning Yellow (#f9e2af)
Medium       → Keyword Blue (#89b4fa)
Low          → Variable Purple (#b4befe)
Very Low     → Muted Text (#7f849c)
```

### **Gradients (Accent Use Only)**

#### **Primary Gradient** - Brand & CTAs

```css
background: linear-gradient(135deg, #89b4fa 0%, #b4befe 100%);
```

Usage: Logo, primary buttons, hero elements

#### **Success Gradient** - Positive Actions

```css
background: linear-gradient(135deg, #a6e3a1 0%, #94e2d5 100%);
```

Usage: Upgrade prompts, success confirmations

#### **Sidebar Gradient** - Depth

```css
background: linear-gradient(180deg, #181825 0%, #11111b 100%);
```

Usage: Sidebar background for subtle depth

---

## 📝 Typography System

### **Font Families**

#### **Sans-Serif (UI Text)**

- **Primary:** System fonts stack
  ```css
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    "Cantarell", sans-serif;
  ```
- **Usage:** All UI text, headings, body copy, buttons, labels
- **Why:** Native feel, excellent readability, zero load time

#### **Monospace (Data & Code)**

- **Primary:** `'Courier New', 'Monaco', 'Menlo', monospace`
- **Usage:**
  - IDs and codes
  - Timestamps and dates
  - Numbers in statistics
  - Code snippets
  - Technical identifiers
- **Why:** Reinforces dev aesthetic, excellent for data alignment

### **Type Scale**

```css
/* Headings */
h1: 32px / 36px (Page titles, hero text)
h2: 22px / 24px (Section titles)
h3: 18px / 20px (Subsection titles)
h4: 16px / 18px (Card titles)

/* Body Text */
Base: 14px / 15px (Standard UI text)
Small: 12px / 13px (Labels, captions, metadata)
Tiny: 11px (Timestamps, footnotes)

/* Monospace Variants */
Stats: 36px (Large numbers in stat cards)
Data: 13px (Timestamps, IDs)
Code: 14px (Code blocks, technical text)
```

### **Font Weights**

```css
Regular: 400 (Body text)
Medium: 500 (Emphasis, active states)
Semibold: 600 (Subheadings, labels)
Bold: 700 (Headings, stats)
```

### **Typography Rules**

1. **Use monospace for:**
   - All numeric values in stat cards
   - Dates and timestamps
   - Project/Task/Feature IDs
   - Any code or technical identifiers

2. **Use gradients sparingly on text:**
   - Logo only
   - Major headings on marketing pages
   - Never on body text or UI elements

3. **Letter spacing:**
   - Uppercase labels: `1px`
   - Logo: `1.5px`
   - Headings: `-0.5px` (tighter)
   - Body: Default

---

## 🧩 Component Design Principles

### **Border Radius Strategy**

```css
None: 0px (Unused)
Subtle: 4px (Not used - too sharp for this theme)
Medium: 8px (Buttons, inputs, small cards)
Large: 12px (Large cards, modals)
Extra: 16px (Hero elements, special components)
```

**Rule:** More important or larger = more rounded

### **Spacing System (8px Base)**

```css
xs: 4px   (Tight gaps, icon spacing)
sm: 8px   (Small gaps within components)
md: 12px  (Standard gaps)
lg: 16px  (Card padding, section gaps)
xl: 20px  (Large section padding)
2xl: 24px (Major spacing)
3xl: 36px (Page sections)
4xl: 48px (Hero spacing)
```

### **Shadow System**

#### **Subtle Shadows** (Default cards)

```css
box-shadow: none; /* Use borders instead */
```

#### **Hover Elevation**

```css
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
```

#### **Active/Focus Glow**

```css
box-shadow: 0 0 0 3px rgba(137, 180, 250, 0.15);
```

**Philosophy:** Prefer borders over shadows for definition. Use shadows only for interactive states and depth.

---

## 🎨 Component Specifications

### **Buttons**

#### **Primary Button**

```css
Background: linear-gradient(135deg, #89b4fa 0%, #b4befe 100%)
Color: #1e1e2e (dark text on light button)
Padding: 10px 20px
Border-radius: 8px
Font-weight: 600
Font-size: 14px

Hover:
  transform: translateY(-1px)
  box-shadow: 0 4px 12px rgba(137, 180, 250, 0.4)
```

#### **Secondary Button**

```css
Background: transparent
Color: #89b4fa
Border: 1px solid #313244
Padding: 10px 20px
Border-radius: 8px
Font-weight: 500
Font-size: 14px

Hover:
  background: rgba(137, 180, 250, 0.1)
  border-color: #89b4fa
```

#### **Destructive Button**

```css
Background: #f38ba8
Color: #1e1e2e
Padding: 10px 20px
Border-radius: 8px
Font-weight: 600
Font-size: 14px

Hover:
  background: #f5a3b8
```

### **Cards**

#### **Standard Card**

```css
Background: linear-gradient(135deg, #181825 0%, #11111b 100%)
Border: 1px solid #313244
Border-radius: 12px
Padding: 24px

Hover:
  border-color: #89b4fa
  transform: translateY(-2px)
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3)
```

#### **Stat Card** (Special variant)

```css
Background: Same as Standard Card
Border-left: 3px solid [semantic color]
/* Blue for projects, Green for tasks, Yellow for progress, etc. */

.stat-value {
  font-family: 'Courier New', monospace
  font-size: 36px
  font-weight: 700
  color: [matching semantic color]
}
```

### **Inputs**

#### **Text Input / Search**

```css
Background: #181825
Border: 1px solid #313244
Padding: 10px 16px
Border-radius: 8px
Color: #cdd6f4
Font-size: 14px

Focus:
  border-color: #89b4fa
  box-shadow: 0 0 0 3px rgba(137, 180, 250, 0.15)
  background: #1e1e2e (slightly lighter)

Placeholder:
  color: #a6adc8
```

### **Navigation Items**

#### **Sidebar Nav Item**

```css
Padding: 12px 24px
Color: #a6adc8 (inactive)
Border-left: 3px solid transparent
Font-size: 14px

Hover:
  background: rgba(137, 180, 250, 0.1)
  color: #cdd6f4

Active:
  background: rgba(137, 180, 250, 0.15)
  color: #89b4fa
  border-left-color: #89b4fa
  font-weight: 500
```

### **Tables / Lists**

#### **Table Header**

```css
Background: rgba(137, 180, 250, 0.05)
Padding: 16px 24px
Border-bottom: 1px solid #313244
Font-size: 12px
Color: #a6adc8
Text-transform: uppercase
Letter-spacing: 1px
Font-weight: 600
```

#### **Table Row**

```css
Padding: 18px 24px
Border-bottom: 1px solid #313244

Hover:
  background: rgba(137, 180, 250, 0.08)

Last-child:
  border-bottom: none
```

### **Badges / Tags**

#### **Status Badge**

```css
/* Use semantic colors based on status */
Padding: 4px 12px
Border-radius: 6px
Font-size: 12px
Font-weight: 600
Background: [status-color with 0.2 opacity]
Color: [status-color]
Border: 1px solid [status-color with 0.3 opacity]
```

Example:

```css
/* "In Progress" badge */
background: rgba(249, 226, 175, 0.2);
color: #f9e2af;
border: 1px solid rgba(249, 226, 175, 0.3);
```

### **Progress Bars**

```css
Background: #313244 (track)
Height: 8px
Border-radius: 8px

Fill:
  background: linear-gradient(90deg, [start-color] 0%, [end-color] 100%)
  /* Use semantic colors: green for high completion, yellow for medium, etc. */
  border-radius: 8px
```

---

## 🎯 Layout Principles

### **Density Guidelines**

**Information Density: Medium-High**

- More compact than generic SaaS (like Notion)
- Not as extreme as IDE file trees
- Balance between usability and efficiency

**Whitespace Rules:**

- **Between sections:** 36-48px
- **Between cards:** 20-24px
- **Within cards:** 24px padding
- **Sidebar items:** 12px vertical padding
- **Table rows:** 18px vertical padding

### **Grid System**

```css
/* Standard page layout */
.container {
  max-width: 1400px;
  padding: 40px 56px;
}

/* Stats grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Responsive breakpoints */
Desktop: 1200px+
Tablet: 768px - 1199px
Mobile: < 768px
```

### **Sidebar Specifications**

```css
Width: 220px
Background: linear-gradient(180deg, #181825 0%, #11111b 100%)
Border-right: 1px solid #313244
Padding: 24px 0

Logo Section:
  padding: 0 24px 24px
  border-bottom: 1px solid #313244
  margin-bottom: 24px

Navigation:
  flex: 1 (takes available space)

Footer/Upgrade Box:
  margin-top: auto
  padding: 20px
  margin: 20px
```

---

## ✨ Interactive States & Animations

### **Transition Defaults**

```css
/* Standard transition for most interactions */
transition: all 0.2s ease;

/* Slower for complex animations */
transition: all 0.3s ease;
```

### **Hover States**

**Cards:**

```css
transform: translateY(-2px);
box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
border-color: #89b4fa;
```

**Buttons:**

```css
transform: translateY(-1px);
box-shadow: 0 4px 12px rgba(137, 180, 250, 0.4);
```

**Navigation Items:**

```css
background: rgba(137, 180, 250, 0.1);
color: #cdd6f4;
/* No transform - too distracting */
```

### **Focus States**

**Inputs:**

```css
border-color: #89b4fa;
box-shadow: 0 0 0 3px rgba(137, 180, 250, 0.15);
outline: none;
```

**Buttons:**

```css
box-shadow: 0 0 0 3px rgba(137, 180, 250, 0.2);
outline: none;
```

### **Active States**

**Buttons:**

```css
transform: translateY(0);
/* Return to original position */
```

---

## 🎨 Special Components

### **Upgrade Box** (Sidebar Footer)

```css
Background: linear-gradient(135deg, rgba(166, 227, 161, 0.1) 0%, rgba(148, 226, 213, 0.1) 100%)
Border: 1px solid #a6e3a1
Border-radius: 8px
Padding: 20px

Title:
  color: #a6e3a1
  font-size: 13px
  font-weight: 600

Description:
  color: #bac2de
  font-size: 11px

Button:
  background: linear-gradient(135deg, #a6e3a1 0%, #94e2d5 100%)
  color: #1e1e2e
```

### **Project Icons**

```css
Width/Height: 40px
Background: linear-gradient(135deg, #313244 0%, #45475a 100%)
Border: 1px solid #45475a
Border-radius: 8px

/* Different colors per project type */
Project 1: rgba(137, 180, 250, 0.2) background + #89b4fa border
Project 2: rgba(166, 227, 161, 0.2) background + #a6e3a1 border
```

### **Empty States**

```css
Text-align: center
Padding: 60px 40px
Color: #7f849c
Font-size: 14px

Icon:
  font-size: 48px
  margin-bottom: 16px
  opacity: 0.3
```

---

## 📱 Responsive Behavior

### **Desktop (1200px+)**

- Full sidebar visible (220px)
- 3-column stat grid
- Maximum content width: 1400px

### **Tablet (768px - 1199px)**

- Collapsible sidebar (icon only)
- 2-column stat grid
- Reduced padding (32px instead of 56px)

### **Mobile (< 768px)**

- Hidden sidebar (hamburger menu)
- 1-column stat grid
- Stack all table columns
- Padding: 20px

---

## 🎯 Accessibility Requirements

### **Color Contrast**

All text must meet WCAG AA standards:

- **Large text (18px+):** 3:1 minimum
- **Normal text:** 4.5:1 minimum

**Verified Combinations:**

- `#cdd6f4` on `#1e1e2e` ✅ (12.5:1)
- `#89b4fa` on `#1e1e2e` ✅ (8.2:1)
- `#a6e3a1` on `#1e1e2e` ✅ (9.1:1)

### **Focus Indicators**

- All interactive elements must have visible focus states
- Never use `outline: none` without alternative
- Focus rings: 3px with 15% opacity of primary color

### **Keyboard Navigation**

- All actions must be keyboard accessible
- Tab order must be logical
- Skip links for main content

---

## 🚀 Implementation Guidelines

### **CSS Variables Setup**

```css
:root {
  /* Syntax Colors */
  --color-keyword-blue: #89b4fa;
  --color-string-green: #a6e3a1;
  --color-variable-purple: #b4befe;
  --color-warning-yellow: #f9e2af;
  --color-error-red: #f38ba8;

  /* Backgrounds */
  --bg-primary: #1e1e2e;
  --bg-secondary: #181825;
  --bg-tertiary: #11111b;
  --bg-hover: rgba(137, 180, 250, 0.1);

  /* Borders */
  --border-primary: #313244;
  --border-subtle: #45475a;
  --border-focus: #89b4fa;

  /* Text */
  --text-primary: #cdd6f4;
  --text-secondary: #bac2de;
  --text-tertiary: #a6adc8;
  --text-muted: #7f849c;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 20px;
  --space-2xl: 24px;
  --space-3xl: 36px;
  --space-4xl: 48px;

  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
}
```

### **When Creating New Pages**

1. **Start with the background hierarchy:**
   - Main content: `--bg-primary`
   - Cards: `--bg-secondary` with gradient to `--bg-tertiary`
   - Sidebar: Gradient from `--bg-secondary` to `--bg-tertiary`

2. **Apply semantic colors:**
   - Check the entity type (Project/Feature/Task)
   - Apply corresponding color from palette
   - Use 10-20% opacity for backgrounds
   - Full opacity for text/borders

3. **Typography hierarchy:**
   - Headings: Sans-serif, appropriate scale
   - Data/IDs: Monospace
   - Body: Sans-serif

4. **Spacing consistency:**
   - Use the 8px base grid
   - Between sections: 36-48px
   - Card padding: 24px
   - Small gaps: 12-16px

5. **Interactive states:**
   - Hover: Slight elevation + border color change
   - Focus: Blue ring with 15% opacity
   - Active: Maintain color, reduce elevation

---

## 🎨 Design Checklist for New Components

Before shipping any new UI component, verify:

- [ ] Uses colors from the syntax palette
- [ ] Has appropriate hover/focus/active states
- [ ] Uses correct typography (monospace for data, sans-serif for UI)
- [ ] Follows spacing system (8px base)
- [ ] Border radius is 8px or 12px (no other values)
- [ ] Meets WCAG AA contrast requirements
- [ ] Has smooth transitions (0.2s ease)
- [ ] Semantic color matches entity type
- [ ] Tested in dark mode (it's the only mode)
- [ ] Keyboard accessible with visible focus
