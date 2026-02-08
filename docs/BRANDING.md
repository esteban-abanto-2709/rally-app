# 🎯 RALLY

**The transparent showcase for software development**

---

## 📋 Project Identity Document

### **Repository Name**

`rally-app`

### **Tagline**

"Where development meets community"

---

## 🎯 Core Concept

**"The transparent showcase for software development"**

A project management system that serves as a **public control panel** where developers work professionally AND fans/users can follow progress in real-time, voting on features that excite them.

---

## 💡 Value Proposition

Rally bridges the gap between development teams and their community by providing:

- **For Developers:** A professional, dev-first project management tool (Jira-like functionality)
- **For Community:** A transparent window into development progress with the ability to influence the roadmap
- **For Projects:** Direct, fluid communication that replaces scattered changelogs and forum posts

### **The Problem It Solves**

- Game developers on itch.io posting text changelogs → fragmented, static updates
- Communities guessing what's coming next → no voice in priorities
- Developers building in isolation → missing valuable user feedback
- Traditional PM tools (Jira) → private, developer-only, zero transparency

### **The Rally Solution**

A **public development dashboard** where:

1. Devs manage work professionally (Projects → Features → Tasks)
2. Users see real-time progress (tasks moving, features advancing)
3. Community votes on features (democratic roadmap influence)
4. Bugs are reported directly into the system
5. Everything is transparent, organized, and actionable

---

## 🏛️ Core Pillars

### **1. Professional First**

- Developers must adopt it as a serious tool
- If devs don't use it → the whole concept fails
- Must feel native to their workflow (IDE aesthetic, keyboard-first, information-dense)
- Quality bar: As robust as Jira for internal work

### **2. Radical Transparency**

- Progress is visible, honest, in real-time
- No hiding behind marketing speak
- The "honest heartbeat" of the project
- Fans check daily to see incremental changes

### **3. Community-Driven**

- Users influence through votes (signal, not noise)
- Democratic prioritization of features
- Direct line between user interest and dev focus
- Engagement without chaos

---

## 👥 Target Audience

### **Primary Users (Developers)**

- **Small teams** (2-10 people) working on software projects
- **Indie game developers** (primary niche, highest benefit)
- **Open-source maintainers** who want community input
- **Any software team** that values transparency

**Why small teams?**

- Solo devs likely won't invest time in PM tools
- Large enterprises have established systems (Jira, etc.)
- Small teams need lightweight, effective tools

### **Secondary Users (Community)**

- **Any interested person** who creates an account
- Fans, early adopters, backers, curious users
- Can vote, comment (future), report bugs (future)
- No technical knowledge required

---

## 🗂️ Information Architecture

### **Hierarchy Evolution**

**Current (Basic):**

```
Users → Projects → Tasks
```

**Target (Dev-Oriented):**

```
Users → Projects → Features → Tasks
```

**Layer Definitions:**

1. **Project** = The Repository / Application (e.g., "My Indie Game")
2. **Features** = Functional modules (e.g., "Authentication System", "Inventory Module")
   - This is the NEW middle layer that organizes tasks
   - Public-facing: Users vote on features
3. **Tasks** = Specific implementation steps (e.g., "Create login API", "Design modal UI")
   - Developer-facing: Granular work items

---

## 🎨 Design Philosophy

### **Aesthetic: "Software Dev" (Modern, Dark, Technical)**

**Visual Identity:**

- **Dark Mode First** - Native to developers (VS Code, Terminal vibes)
- **High Information Density** - Developers prefer data over whitespace
- **Syntax Highlighting Colors** - Not generic red/green, but code-token colors
- **Monospaced Accents** - For IDs, status codes, technical data
- **Clean Sans-Serif** - For readability in prose

> **Note:** For specific color palettes, typography, and component specifications, please refer to the **[Visual Style Guide](./VISUAL_STYLE_GUIDE.md)**.

**UX Principles:**

- **Keyboard-First Navigation** - Power users demand speed
- **Minimal Whitespace** - Like spreadsheets or IDE file explorers
- **Distinct Focus States** - Clear visual hierarchy
- **Fast, Responsive** - No bloat, no lag

**Why This Matters:**

- If it doesn't feel professional, devs won't use it
- If devs don't use it, the transparency concept fails
- The aesthetic IS the trust signal

---

## 🚀 Feature Roadmap (Prioritized)

### **Phase 1: Core Foundation (MVP)**

✅ User authentication
✅ Projects management
✅ Tasks management
🔄 **Features layer** (new middle tier)
🔄 **Public/Private project toggle**

### **Phase 2: Community Engagement**

- **Feature voting system** (THE core hook)
- Public project pages (shareable URLs)
- Real-time progress indicators

### **Phase 3: Advanced Interaction (Ideas for later)**

- Comments on features/tasks
- Bug reporting system
- User profiles & activity tracking
- Email notifications for updates

**Scope Note:**

- Focus on **voting** as the primary community feature
- Comments, forums, etc. = nice-to-have for later
- Only expand if the project is adopted and loved

---

## 🎯 The "Hook" (Star Feature)

**"The living roadmap with democratic influence"**

Imagine:

- Game fans opening Rally daily to see task progress bars inch forward
- Seeing a feature they voted for move from "Open" to "In Progress"
- Feeling part of the creation process
- Developers seeing which features have 500 votes vs. 20 votes

**This is the magic:**

- Not just transparency (changelogs do that)
- Not just voting (polls do that)
- But **transparent development + democratic influence** in one unified system

---

## 🔧 Technical Foundation

### **Current Stack**

- **Frontend:** Next.js 16 (React 19), Tailwind CSS v4, Lucide React
- **Backend:** NestJS 11, Prisma 7 (PostgreSQL), Passport/JWT Auth
- **Architecture:** Monorepo (`apps/web`, `apps/api`) with Docker
- **Design System:** Radix UI primitives, Shadcn/UI components

### **Status Methodology**

- **Priorities:** 5 Levels (Very High → Very Low)
- **Status:** `Open` → `In Progress` → `Done`
  - (Note: "Open" replaces "Todo" for clearer public communication)

---

## 🧭 Brand Personality

**If Rally were a person:**

- Honest, transparent, no BS
- Professional but not corporate
- Technical but approachable
- Community-focused but not chaotic
- Indie spirit with enterprise quality

**Tone of Voice:**

- Direct, clear, concise
- Developer-friendly (speaks their language)
- Welcoming to non-technical users
- Confident without arrogance

---

## 🎬 Success Metrics (Future Vision)

**The project succeeds when:**

- Indie devs choose Rally over Trello/Notion for transparency
- Game communities say "check our Rally" instead of "read our changelog"
- A feature with 1000+ votes gets prioritized by the dev team
- Users feel genuinely connected to development progress

---

## 📝 Notes & Constraints

**Why "Rally" over "TaskFlow"?**

- TaskFlow = generic, describes a function
- Rally = evocative, memorable, suggests gathering/action
- Easy to remember, brandable, room to grow

**Why `rally-app` as repo name?**

- Simple, clean, not overly descriptive
- Leaves room for future products (rally-cli, rally-mobile, etc.)
- Professional naming convention

**Critical Success Factor:**

- **Developers MUST use it daily** for real work
- If it's not their actual PM tool, the transparency is fake
- Everything else builds on this foundation

---

## 🔄 Next Steps

1. ✅ **Identity Definition** (this document)
2. ✅ **Visual Identity & Tokens** (see [Visual Style Guide](./VISUAL_STYLE_GUIDE.md))
3. ⏭️ **Component Library Implementation**
4. ⏭️ **Feature Layer Implementation** (new data model)
5. ⏭️ **Public/Private Toggle** (privacy controls)
6. ⏭️ **Voting System** (the star feature)

---

**Document Version:** 1.1
**Last Updated:** February 6, 2026
**Status:** Foundation Complete ✅

---

_This document is the source of truth for Rally's identity, vision, and strategic direction. For visual implementation details, refer to the Style Guide._
