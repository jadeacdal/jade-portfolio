# Jade Acdal — Personal Portfolio

A responsive student portfolio built with **HTML5, CSS3, and vanilla JavaScript**. It uses a white, pink, and black visual identity, smooth section reveals, a mobile menu, a desktop cursor effect, gentle portrait parallax, project cards, a learning timeline, and a client-side validated contact form, and a lightweight animated pink/violet wire-ribbon canvas in the hero.

> Important: Personal details that have not been supplied are marked as editable placeholders. Replace them before publishing. The contact form validates input in the browser only; it does not send email.

## Project structure

```text
jade-portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── jade-profile.svg
│   ├── project-1.svg
│   ├── project-2.svg
│   └── project-3.svg
└── README.md
```

## Run it in Visual Studio Code

1. Extract the `jade-portfolio.zip` file.
2. Open Visual Studio Code.
3. Choose **File → Open Folder…** and select the `jade-portfolio` folder.
4. In the Explorer panel, check that `index.html`, `css/style.css`, and `js/script.js` are present.
5. Install the **Live Server** extension by Ritwick Dey from the Extensions panel.
6. Right-click `index.html` and select **Open with Live Server**.
7. Your browser should open the local website. Save edits in VS Code and Live Server will refresh the page.

The project does not require npm, a build process, or a JavaScript framework. Google Fonts are loaded online; if you are offline, the browser will use fallback fonts.

## Personalize the website

### 1. Profile photo

- Jade's supplied portrait is already saved as `images/jade-profile.png` and connected in `index.html`. To replace it later, add another image to `images/` and update the profile image element's `src`.
- Use a clear, well-lit portrait. The design crops the image to fit the arched frame.

### 2. About section

Edit the introduction in the `#about` section of `index.html`. Keep only interests and goals that are true for Jade. Update the three information cards with details you want to share.

### 3. Skills

The skills section currently includes HTML5, CSS3, JavaScript, and an editable extra card as examples. Keep only technologies Jade actually uses or is learning. To add a card, copy one `<article class="skill-card">…</article>` element inside `.skills-grid`.

### 4. Projects

Each project card is a placeholder. For every real project, update:
- Project title
- Short description
- Technologies used
- Project year
- Live project URL
- Source-code URL (if public)

Replace placeholder `href="#contact"` values with actual URLs only when available. Do not publish fictional projects or links. To use your own thumbnails, place the files in `images/` and update the corresponding image `src` values in `index.html`.

### 5. Journey

Edit the timeline in the `#journey` section with real academic milestones, subjects, projects, and future goals. Do not add dates or achievements unless they are accurate.

### 6. Contact and social profiles

- The supplied email `jademelanielacdal@gmail.com` is already added to the contact section. Update the displayed email and `mailto:` link if it changes.
- Jade's supplied GitHub profile (`https://github.com/jadeacdal`) is connected. Replace the LinkedIn and Facebook placeholder links with real profile URLs, or remove the links you do not want.
- The current contact form only checks required fields and email format. To receive submissions, connect a backend or a form service and update the JavaScript accordingly. Do not tell visitors their message was delivered until delivery is implemented.

### 7. Colors and typography

Open `css/style.css`. The main colors are stored as CSS variables at the top under `:root`, including `--pink`, `--pink-bright`, `--pink-deep`, `--ink`, and `--blush`. Change the variables to adjust the theme consistently.

## Testing checklist

- [ ] Open `index.html` using Live Server.
- [ ] Click every navigation item and confirm it scrolls to the right section.
- [ ] Test the mobile menu at a narrow viewport.
- [ ] Confirm all image placeholders appear.
- [ ] Replace placeholders with real personal details and projects.
- [ ] Test the contact form with empty fields, an invalid email, and valid-looking values.
- [ ] Confirm the form clearly states that it does not send messages.
- [ ] Navigate using Tab and Enter and check visible focus indicators.
- [ ] Test at mobile, tablet, and desktop widths.
- [ ] Check browser console for errors.
- [ ] Test with reduced motion enabled in the operating system.
- [ ] Verify all external URLs and contact details before publishing.

## Publish the portfolio

### Option A: GitHub Pages

1. Create or sign in to a GitHub account.
2. Create a new repository, for example `jade-portfolio`.
3. Upload the contents of this folder to the repository root (the `index.html` file should be at the root).
4. Open **Settings → Pages**.
5. Under the build/deployment source, choose **Deploy from a branch**.
6. Select the `main` branch and `/ (root)`, then save.
7. Wait for the deployment to finish and open the URL shown in the Pages settings.

### Option B: Cloudflare Pages

1. Upload the project to a GitHub repository.
2. In the Cloudflare dashboard, open **Workers & Pages** and create a Pages project connected to that repository.
3. Since this is a static site, leave the build command empty.
4. Set the build output directory to `/` (the repository root), then deploy.
5. Test the published URL and verify that the images, CSS, and JavaScript load correctly.

## Accessibility and motion

- Semantic sections and labels are used throughout.
- The mobile navigation exposes its expanded state to assistive technology.
- Focus indicators are visible for keyboard navigation.
- The page includes a skip link.
- Cursor and parallax effects are limited to desktop pointer devices.
- The design respects `prefers-reduced-motion: reduce`.
- The form announces validation feedback through a live region.

## Files to edit most often

- `index.html` — content, links, skills, project details, and images
- `css/style.css` — colors, spacing, responsive layout, and visual effects
- `js/script.js` — menu, scroll reveals, cursor effects, and form validation


## Animated interference ribbons and React Bits Pro

The current portfolio is a static HTML/CSS/vanilla-JavaScript project, so the hero now uses a lightweight canvas ribbon effect that matches the pink/violet theme and respects reduced-motion settings. This is a native equivalent, **not the official React Bits Pro React component**.

A `components.json` registry configuration scaffold is included for the React Bits Pro Starter and Pro registries, with the Authorization header referencing `${REACTBITS_LICENSE_KEY}`. `.env.example` documents the variable; it intentionally contains no real license key.

To install the official `@reactbits-starter/interference-ribbons-tw` component, first migrate or create a React + Tailwind project and initialize shadcn/ui (`npx shadcn@latest init`) so the project has the expected React/Tailwind files and aliases. Set `REACTBITS_LICENSE_KEY` in that React project's `.env.local`, then run:

```bash
npx shadcn@latest add @reactbits-starter/interference-ribbons-tw
```

The command has not been run in this static HTML project because it is not currently a React/shadcn app and no license key was supplied to this workspace. Do not put the real key in source control. Official docs: https://pro.reactbits.dev/docs/installation and https://pro.reactbits.dev/docs/components/interference-ribbons.
