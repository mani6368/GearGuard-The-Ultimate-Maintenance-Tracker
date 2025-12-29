# 🛡️ GearGuard: The Ultimate Maintenance Tracker

> **Vibe Coding Hackathon Submission**
>
> *A smart, Odoo-inspired Maintenance Management System (MMS) connecting Equipment, Teams, and Requests in one seamless interface.*

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](YOUR_LIVE_LINK_HERE)
[![Tech Stack](https://img.shields.io/badge/Built%20With-React%20%7C%20Tailwind%20%7C%20Vite-blue)]()

---

## 📖 Project Overview
[cite_start]**GearGuard** is a robust maintenance tracking solution designed to streamline asset management and repair workflows[cite: 4]. [cite_start]It solves the chaos of broken equipment by connecting **What is broken (Equipment)** with **Who fixes it (Teams)** and **The work to be done (Requests)**[cite: 5].

[cite_start]Built with a "Glassmorphism" UI, it provides a modern user experience while adhering to strict business logic required for enterprise maintenance[cite: 52].

---

## 🚀 Key Features

### 🏗️ 1. Smart Equipment Management
* [cite_start]**Central Database:** Tracks ownership (Department/Employee), serial numbers, and warranty info[cite: 8, 16, 17].
* [cite_start]**Smart Automation:** Automatically fetches and assigns the correct Maintenance Team based on the equipment category[cite: 41].
* [cite_start]**"Smart Button" History:** Features an Odoo-style smart button on every equipment card that displays a badge counter of open requests and filters history with one click[cite: 69, 73].

### 📋 2. Interactive Kanban Board
* [cite_start]**Drag-and-Drop Workflow:** Seamlessly move tickets through stages: `New` ➝ `In Progress` ➝ `Repaired` ➝ `Scrap`[cite: 55, 57].
* **Visual Indicators:**
    * [cite_start]🔴 **Red Strip/Text:** Instantly flags Overdue requests[cite: 60].
    * [cite_start]👤 **Technician Avatars:** See who is working on what at a glance[cite: 59].

### 📅 3. Preventive & Corrective Maintenance
* [cite_start]**Breakdown Handling:** Fast creation of "Corrective" requests for unexpected failures[cite: 28].
* [cite_start]**Routine Checkups:** Integrated **Calendar View** for scheduling "Preventive" maintenance to ensure technicians know their upcoming jobs[cite: 49, 61].
* [cite_start]**Scrap Logic:** If a request is moved to "Scrap," the system logically flags the equipment as unusable[cite: 74].

---

## 🛠️ Tech Stack
* **Frontend:** React.js + Vite
* **Styling:** Tailwind CSS (Modern Industrial Theme)
* **Icons:** Lucide React
* **Components:** Shadcn UI / Headless UI logic

---

## 📸 Screenshots
*(Add your screenshots here - Dashboard, Kanban, and Equipment View)*

---

## ⚡ How to Run Locally

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/mani6368/GearGuard-The-Ultimate-Maintenance-Tracker.git](https://github.com/mani6368/GearGuard-The-Ultimate-Maintenance-Tracker.git)
    ```
2.  **Install Dependencies**
    ```bash
    cd GearGuard-The-Ultimate-Maintenance-Tracker
    npm install
    ```
3.  **Start the Server**
    ```bash
    npm run dev
    ```

---

## 🏆 Hackathon Objective
[cite_start]This project was built to address the **"GearGuard" Problem Statement**, focusing on creating a "living" module with specialized teams, auto-fill business logic, and advanced UX views like Kanban and Calendar[cite: 2, 37].
