# SeeShop Landing Page

This is the MVP landing page for SeeShop - Live Shopping Reimagined.

## 🌐 Live URL
**Landing Page:** [https://seeshop.netlify.app/](https://seeshop.netlify.app/)

**Deployed on:** Netlify
**Last Updated:** January 2025

## Setup Instructions for GitHub Pages

### Step 1: Push to GitHub
```bash
git add docs/
git commit -m "Add SeeShop landing page for ALX MVP submission"
git push origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Source", select:
   - Branch: `main`
   - Folder: `/docs`
5. Click **Save**
6. Wait 1-2 minutes for deployment
7. Your site will be live at: `https://[your-username].github.io/thenga-shop/`

### Step 3: Set Up Email Form (Optional)

The form currently uses a placeholder. To make it functional:

#### Option A: Use Formspree (Recommended - Free)
1. Go to [formspree.io](https://formspree.io)
2. Sign up for free account
3. Create a new form
4. Copy your form endpoint (looks like: `https://formspree.io/f/xyzabc123`)
5. In `docs/index.html`, replace:
   ```html
   <form id="betaForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   with your actual Formspree endpoint

#### Option B: Use Email Link
Users can also email directly to `beta@seeshop.app` (update this with your actual email)

### Step 4: Customize Content
Update the following in `docs/index.html`:
- Email addresses (replace `beta@seeshop.app` and `support@seeshop.app`)
- Add screenshots of your app (replace phone mockup placeholder)
- Update testimonials with real user feedback
- Add your social media links if desired

### Step 5: Test Your Site
1. Visit your GitHub Pages URL
2. Test form submission
3. Check mobile responsiveness
4. Verify all links work

### Step 6: Submit to ALX
Submit your GitHub Pages URL to the ALX submission form!

## Features Included

✅ Clear value proposition
✅ Prominent beta testing instructions
✅ Gmail signup requirement highlighted
✅ Step-by-step access guide
✅ Mobile responsive design
✅ Professional UI with animations
✅ FAQ section
✅ Contact information
✅ Email signup form

## File Structure
```
docs/
├── index.html    # Main landing page
├── styles.css    # All styling
├── script.js     # Interactive features
└── README.md     # This file
```

## Technologies Used
- HTML5
- CSS3 (with CSS Grid & Flexbox)
- Vanilla JavaScript
- Google Fonts (Inter)
- Responsive Design
- Smooth scroll animations

---

Built for ALX Founders Program MVP Submission
© 2025 SeeShop
