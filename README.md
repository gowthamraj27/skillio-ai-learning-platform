# SKILLIO — Interactive Onboarding & Student Growth Dashboard

Welcome to **SKILLIO**, a playful, premium AI-powered personalized learning companion that guides students toward their dream tech careers.

---

## 🎨 Visual Identity & Colour Palette
* **Primary Purple (`#7956D8`)**: Brand anchor, active navigation states, primary tactile buttons, and Blobby's organic hue.
* **Deep Purple (`#6542BC`)**: Physical button bevels (`shadow-playful-purple`), button hover states, and card highlights.
* **Lavender (`#A78BFA`)**: Gradient transitions, secondary icons, and target skill borders.
* **Soft Lavender (`#E9DFFF`)**: Subtle borders, dividing lines, progress tracks, and ambient background blurs.
* **Pale Purple (`#F3EDFF`)**: Active badge pills, card highlight fills, and XP counters.
* **Almost-White Purple (`#FAF7FF`)**: Soft canvas backdrop, modal surfaces, and subtle card backings.
* **Text Dark Plum (`#302747`)**: Ultra-legible, high-contrast dark plum typography (no harsh black).
* **Mascot & Reward Accents (`#FF914D` & `#FFD45C`)**: Blushing cheeks, golden sprout star, and completion confetti.

---

## 👾 Onboarding Journey & Name Collection

1. **Welcome Scene**:
   * Entrance animation with Blobby waving:
     * *“Hey there! I’m Blobby 👋”*
     * *“Let’s discover what makes you unique and build your next learning adventure.”*
   * Action button: **“Let’s Go!”**
2. **Mandatory First Question — Identity**:
   * Prompt: *“Hey! Before we begin, what should I call you?”*
   * Title: *“What should I call you?”*
   * Friendly name input field (saved in `localStorage` as `skillio_student_name`).
3. **Question 1 — Education**:
   * *“Where are you in your learning journey?”* (School student, Undergraduate, Postgraduate, Working professional).
4. **Question 2 — Career Interests**:
   * *“What kind of future excites you?”* (AI, Software Dev, Data Science, Cybersecurity, Robotics, Design, etc.).
5. **Question 3 — Existing Skills**:
   * *“What skills do you already have?”* (Python, C++, Java, Web Dev, Communication, ML + custom adder).
6. **Question 4 — Achievements (Optional)**:
   * *“What have you worked on so far?”* (Projects, Hackathons, Internships, Certifications, Open Source).
7. **Question 5 — Personal Ambition**:
   * *“What is one thing you really want to achieve?”* (Input + suggested goal pills).
8. **Completion Scene**:
   * Blobby celebrates with confetti!
   * Compact Student Passport card with verified answers.
   * Action button: **“Explore My Learning Journey”** (opens the Main Student Dashboard!).

---

## 🎓 Main Student Dashboard

SKILLIO **does not** create, host, or paywall courses. Instead, it serves as a personalized compass guiding students to the best external resources on the web (Google Cloud Skills Boost, Kaggle Learn, AWS Skill Builder).

### Dashboard Sections:

* **Left Sidebar**:
  * SKILLIO Brand Logo
  * **Home**: Comprehensive overview
  * **My Learning**: Curated external learning tracks
  * **Skill Progress**: Visual breakdown of declared vs. target competencies
  * **My Profile**: Full Student Passport and profile details
  * **Settings**: Sound feedback toggles and localStorage reset
* **A. Welcome Section**:
  * Personalized greeting: *“Hey, [Name]! Ready to level up?”* (e.g. *“Hey, Arjun! Ready to level up?”*)
  * Subtitle: *“Your next achievement is just one step away.”*
  * Blobby waving beside greeting with XP indicator (`120 XP • Level 1 Explorer`) and 1-day streak badge.
* **B. Career Destination Card**:
  * Title: *“Your Destination”*
  * Displays student's chosen career target (e.g. *AI / ML Engineer*, *Software Development*).
  * Visual kickoff progress indicator (*“Phase 1: Foundations Kickoff”*).
* **C. Today's Learning Mission (Prominent Feature)**:
  * Personalized activity recommendation with estimated duration (20 mins), expected skill improvement, and XP reward.
  * **“Start Learning”** button opens the verified external resource (e.g. Kaggle Learn, Google Cloud Skills Boost).
* **D. Picked for Your Growth (External Platforms)**:
  * 3 Recommendation cards curated for the student:
    1. **Google Cloud Skills Boost** (Cloud & Generative AI Foundations)
    2. **Kaggle Learn** (Interactive Python & ML Micro-Courses)
    3. **AWS Skill Builder** (Cloud Architecture & System Design)
* **E. Your Skill Universe**:
  * Clean visual cards distinguishing **In Profile** declared skills from **Next Target** competencies.
* **F. Learning Streak**:
  * Motivational card: *“Your learning journey starts with one consistent step.”*
  * Weekly activity tracker with today highlighted.

---

## 🚀 Running the App
```bash
# In the skillio folder:
npm run dev

# Or from the repository root:
npm run dev
```
Dev server is active at **`http://localhost:3000/`**.
