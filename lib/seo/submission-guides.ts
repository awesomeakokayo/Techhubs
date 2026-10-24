import { SeoPage } from './content-types'

/**
 * Public Project Submission Help Center content.
 *
 * Beginner-friendly, original guides that teach learners how to create and share
 * the artifacts TechSkillHub projects require. URLs are stable and match the
 * `helpGuideId` values referenced by submission contracts and project steps.
 */

const UPDATED = '2026-01-10T00:00:00.000Z'
const PUBLISHED = '2026-01-10T00:00:00.000Z'

export const SUBMISSION_INDEX = {
  title: 'Project Submission Help Center',
  seoTitle: 'How to Submit a Project: Beginner Guides for GitHub, Figma, Video & More',
  description:
    'Step-by-step, beginner-friendly guides for preparing and sharing project deliverables on TechSkillHub: public GitHub repositories, live sites, Google Drive files, Figma prototypes, videos, documents and more.',
  openingAnswer:
    'Each TechSkillHub project asks you to share real evidence of your work, such as a public GitHub repository, a live site, a design file or a document. These guides show you exactly how to create and share each type of deliverable, confirm it is public, and avoid leaking secrets.',
}

export const SUBMISSION_GUIDE_CONTENT: Record<string, SeoPage> = {
  'publish-a-public-github-repository': {
    slug: 'publish-a-public-github-repository',
    title: 'How to Create a Public GitHub Repository (Beginner Guide)',
    seoTitle: 'How to Create a Public GitHub Repository as a Beginner',
    description:
      'Create a free public GitHub repository, understand why it must be public, and confirm that anyone can view it so your project can be assessed.',
    openingAnswer:
      'Create a free GitHub account, click "New repository", give it a clear name, choose "Public", and create it. A public repository lets anyone — including an evaluator — view your source files, so it is the standard way to submit a coding project.',
    intro:
      'GitHub is where most developers store and share code. For TechSkillHub coding projects, a public repository is the expected deliverable because it lets your code be inspected. You do not need to learn Git commands to start: GitHub works through your browser.',
    audiences: ['Absolute beginners', 'Career switchers', 'Self-taught learners'],
    sections: [
      {
        heading: 'What is a repository, and why does it need to be public?',
        blocks: [
          { kind: 'paragraph', text: 'A repository (or "repo") is a project folder that lives on GitHub. It holds your code, a README, and a history of your changes. When a repository is public, anyone with the link can read it. TechSkillHub requires public repositories for coding projects so an evaluator can confirm what you actually built. A private repository cannot be inspected and will be rejected.' },
          { kind: 'callout', text: 'A public repository can be seen by other people. Never put passwords, API keys, private data or personal information in a public repository.' },
        ],
      },
      {
        heading: 'What you need before you start',
        blocks: [
          { kind: 'list', items: ['A free GitHub account (you can sign up with an email address at github.com)', 'A project folder on your computer, or the files you want to store', 'A few minutes'] },
        ],
      },
      {
        heading: 'Create the repository',
        blocks: [
          { kind: 'steps', items: [
            { title: 'Sign in to GitHub', text: 'Go to github.com and sign in. If you do not have an account, click Sign up and confirm your email address.' },
            { title: 'Start a new repository', text: 'Click the + menu in the top right (or go to github.com/new) and choose "New repository".' },
            { title: 'Name it clearly', text: 'Use a short, descriptive name, for example weather-app or sales-dashboard. Avoid spaces.' },
            { title: 'Choose Public', text: 'Select the "Public" option. This is required so your work can be viewed and assessed.' },
            { title: 'Add a README', text: 'Tick "Add a README file". You can improve it later following the README guide.' },
            { title: 'Create it', text: 'Click "Create repository". You now have a public repository at github.com/your-username/repository-name.' },
          ] },
          { kind: 'callout', text: 'Your repository URL looks like https://github.com/your-username/repository-name. This is the link you submit on TechSkillHub.' },
        ],
      },
      {
        heading: 'Confirm it is public',
        blocks: [
          { kind: 'paragraph', text: 'Open your repository link in a private or incognito browser window while signed out. If you can see the files without signing in, it is public. If you are asked to sign in, the repository is still private.' },
        ],
      },
    ],
    faqs: [
      { question: 'Do I need to know Git commands?', answer: 'No. You can create and edit files entirely through GitHub in your browser. See the guide on uploading files to GitHub without the terminal.' },
      { question: 'Can I make a repository public later?', answer: 'Yes. In Settings > General, scroll to Danger Zone and change visibility. Double-check that no secrets were committed first.' },
      { question: 'What if I do not want a public repository?', answer: 'Some projects allow an alternative public code sandbox. Check the project requirements. A private repository cannot be assessed.' },
    ],
    cta: { label: 'Browse coding projects', href: '/tracks' },
    related: [
      { title: 'Upload your project files to GitHub', href: '/submit-help/upload-project-files-to-github', description: 'Add files through the web interface.' },
      { title: 'Organise files and write a README', href: '/submit-help/organise-files-and-write-a-readme', description: 'Make your repository easy to assess.' },
      { title: 'Check your repository is public', href: '/submit-help/check-a-github-repository-is-public', description: 'Confirm an evaluator can view it.' },
    ],
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
  },

  'upload-project-files-to-github': {
    slug: 'upload-project-files-to-github',
    title: 'How to Upload Project Files to GitHub Without the Terminal',
    seoTitle: 'Upload Files to GitHub Without Using the Command Line',
    description:
      'Upload your project files to a public GitHub repository using only your browser — no Git commands, no terminal required.',
    openingAnswer:
      'Open your public repository, click "Add file" > "Upload files", drag your project files in, write a short commit message such as "Add project files", and click "Commit changes". Your files are now public on GitHub.',
    intro:
      'You do not need to learn command-line Git to submit a project. GitHub lets you drag and drop files straight into your repository in the browser. This guide also explains what to upload and what to leave out.',
    audiences: ['Beginners', 'Learners avoiding the terminal', 'Non-programmers packaging a project'],
    sections: [
      {
        heading: 'What you need',
        blocks: [
          { kind: 'list', items: ['A public repository (see the guide on creating one)', 'A project folder on your computer', 'Your repository open in a browser tab'] },
        ],
      },
      {
        heading: 'Upload your files',
        blocks: [
          { kind: 'steps', items: [
            { title: 'Open the repository', text: 'Go to github.com/your-username/repository-name.' },
            { title: 'Choose Add file', text: 'Click the "Add file" button, then "Upload files".' },
            { title: 'Drag your files in', text: 'Drag the project folder or select the files. Keep the folder structure sensible (for example a src folder).' },
            { title: 'Write a commit message', text: 'At the bottom, under Commit changes, type a short message like "Add project files".' },
            { title: 'Commit', text: 'Click "Commit changes". GitHub uploads your files and they become visible to everyone.' },
          ] },
        ],
      },
      {
        heading: 'What not to upload',
        blocks: [
          { kind: 'list', items: ['.env files containing keys, tokens or passwords', 'node_modules, build/ and dist/ folders (they are regenerated)', 'Large videos, datasets and binaries — link to them instead', 'Personal or client data you do not have permission to share'] },
          { kind: 'callout', text: 'If you already uploaded a secret, remove it, then rotate (change) that key. Deleting the file is not enough because it stays in the history.' },
        ],
      },
      {
        heading: 'Common problems',
        blocks: [
          { kind: 'list', items: ['"Upload" greyed out: make sure you are signed in and in your own repository.', 'Files missing after upload: refresh the page; very large files may be rejected by size limits.', 'Wrong folder: use Add file again to place files in the right folder, or delete and re-upload.'] },
        ],
      },
    ],
    faqs: [
      { question: 'Can I edit files after uploading?', answer: 'Yes. Click a file, then the pencil icon to edit it directly in the browser.' },
      { question: 'Do I need a .gitignore file?', answer: 'It is helpful. It tells Git which files not to track, such as .env and node_modules.' },
    ],
    cta: { label: 'See coding tracks', href: '/tracks' },
    related: [
      { title: 'Create a public repository', href: '/submit-help/publish-a-public-github-repository', description: 'Start here if you have no repository yet.' },
      { title: 'Protect API keys and personal data', href: '/submit-help/protect-api-keys-and-personal-data', description: 'Never commit secrets.' },
    ],
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
  },

  'organise-files-and-write-a-readme': {
    slug: 'organise-files-and-write-a-readme',
    title: 'How to Organise Your Files and Write a Good README',
    seoTitle: 'How to Organise Project Files and Write a README',
    description:
      'A clear file structure and a short, useful README make your project easy for an evaluator to understand and run.',
    openingAnswer:
      'Put your source code in a clear folder such as src, keep your README at the top level, and explain in the README what the project does, how to run it, and what you learned. A README with a title, a short description, setup steps and a screenshot is enough.',
    intro:
      'An evaluator opens your repository and has a few minutes to understand it. Good structure and a README remove guesswork so your actual work can be assessed fairly.',
    audiences: ['Beginners', 'Coding project submitters', 'Data project submitters'],
    sections: [
      {
        heading: 'A simple, clear structure',
        blocks: [
          { kind: 'list', items: ['README.md at the top level', 'src/ for your main source code', 'tests/ for automated tests if you have them', 'public/ or assets/ for images and static files', 'package.json, requirements.txt or pyproject.toml for dependencies'] },
          { kind: 'paragraph', text: 'You do not need an elaborate structure. The goal is that a stranger can tell which files are the important ones.' },
        ],
      },
      {
        heading: 'What a good README contains',
        blocks: [
          { kind: 'steps', items: [
            { title: 'Title and one-line description', text: 'What the project is, in one sentence.' },
            { title: 'What it does', text: 'Two or three sentences on the problem it solves and its main features.' },
            { title: 'How to run it', text: 'The exact commands or steps, including any environment variables needed (never the secret values).' },
            { title: 'Screenshots', text: 'One or two images of the project running make a huge difference.' },
            { title: 'What you learned / decisions', text: 'A short note on the main technical decisions and any limitations.' },
          ] },
        ],
      },
      {
        heading: 'README example',
        blocks: [
          { kind: 'paragraph', text: '# Weather App\nA small app that shows the current weather for a searched city using the OpenWeather API.\n\n## Run it\n1. npm install\n2. Create a .env file with VITE_WEATHER_KEY=<your key>\n3. npm run dev\n\n## What I learned\nHandling loading and error states, and not exposing the API key in client code.' },
        ],
      },
    ],
    faqs: [
      { question: 'How long should a README be?', answer: 'Usually half a page to a page. Complete enough that someone can run your project, short enough to read quickly.' },
      { question: 'Where do I put environment variables?', answer: 'Mention their names in the README, but never their values. Keep the real values in a local .env file that is not committed.' },
    ],
    cta: { label: 'Browse projects', href: '/projects' },
    related: [
      { title: 'Protect API keys and personal data', href: '/submit-help/protect-api-keys-and-personal-data', description: 'Document variables without leaking secrets.' },
      { title: 'Document testing', href: '/submit-help/document-testing-and-demonstrate-it-works', description: 'Show that it works.' },
    ],
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
  },

  'check-a-github-repository-is-public': {
    slug: 'check-a-github-repository-is-public',
    title: 'How to Check That Your GitHub Repository Is Public and Accessible',
    seoTitle: 'Check a GitHub Repository Is Public and Viewable',
    description:
      'Confirm that an evaluator can open your repository without signing in, and fix it if it is still private.',
    openingAnswer:
      'Open your repository URL in an incognito or private browser window while signed out. If the files are visible, it is public. If GitHub asks you to sign in, it is private — change it to public in Settings > General.',
    intro:
      'Most rejected coding submissions are simply private repositories. This takes two minutes to check and prevents wasted assessment attempts.',
    audiences: ['Beginners', 'Coding project submitters'],
    sections: [
      {
        heading: 'The incognito test',
        blocks: [
          { kind: 'steps', items: [
            { title: 'Copy your repository URL', text: 'It looks like https://github.com/your-username/repository-name.' },
            { title: 'Open an incognito window', text: 'In Chrome, Ctrl+Shift+N (Windows) or Cmd+Shift+N (Mac).' },
            { title: 'Paste the URL', text: 'You should see the repository files without signing in.' },
          ] },
        ],
      },
      {
        heading: 'If it is private',
        blocks: [
          { kind: 'steps', items: [
            { title: 'Open repository Settings', text: 'In your repository, click the Settings tab.' },
            { title: 'Find the Danger Zone', text: 'Scroll to the bottom to "Danger Zone".' },
            { title: 'Change visibility', text: 'Click "Change visibility" and choose "Make public". Confirm.' },
            { title: 'Repeat the incognito test', text: 'Check again that the files are visible while signed out.' },
          ] },
          { kind: 'callout', text: 'Before making a repository public, remove any .env files, keys or personal data. Once public, the content can be seen and cached by others.' },
        ],
      },
    ],
    faqs: [
      { question: 'The link works for me but not for my evaluator. Why?', answer: 'You may be signed in. Always verify in an incognito window while signed out.' },
      { question: 'Can I use a private repository?', answer: 'Not for projects that require source inspection. A private repository cannot be assessed.' },
    ],
    cta: { label: 'Browse tracks', href: '/tracks' },
    related: [
      { title: 'Create a public repository', href: '/submit-help/publish-a-public-github-repository', description: 'Start here.' },
      { title: 'Protect API keys and personal data', href: '/submit-help/protect-api-keys-and-personal-data', description: 'Before going public.' },
    ],
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
  },

  'publish-and-share-a-live-frontend-project': {
    slug: 'publish-and-share-a-live-frontend-project',
    title: 'How to Publish and Share a Live Frontend Project',
    seoTitle: 'Publish a Frontend Project Online (Free Hosting)',
    description:
      'Deploy a frontend project to free hosting such as Netlify, Vercel or GitHub Pages, and share the working link.',
    openingAnswer:
      'Push your project to GitHub, connect the repository to a free host such as Netlify or Vercel, and deploy. The host gives you a public URL you can share. Some projects also accept GitHub Pages.',
    intro:
      'A live link lets an evaluator see your interface working, not just read the code. Deployment is usually a few clicks once your project is on GitHub.',
    audiences: ['Frontend learners', 'Full-stack learners', 'No-code builders'],
    sections: [
      {
        heading: 'Before you deploy',
        blocks: [
          { kind: 'list', items: ['Your project builds locally without errors (run the production build command)', 'Any API keys are in environment variables, not in the code', 'A README explains how to run it'] },
        ],
      },
      {
        heading: 'Deploy with a free host',
        blocks: [
          { kind: 'steps', items: [
            { title: 'Push to GitHub', text: 'Make sure your project is in a public repository.' },
            { title: 'Sign up to a host', text: 'Create a free account on Netlify or Vercel, or use GitHub Pages for static sites.' },
            { title: 'Connect the repository', text: 'Choose "Import from Git" and select your repository.' },
            { title: 'Set the build settings', text: 'The host usually detects your framework. Set the build command (for example npm run build) and output folder if asked.' },
            { title: 'Add environment variables', text: 'If your app needs keys, add them in the host\'s environment variables settings — not in the code.' },
            { title: 'Deploy and test', text: 'Click Deploy, wait for the build, then open the URL and test it in a fresh browser tab.' },
          ] },
        ],
      },
      {
        heading: 'Verify and share the correct link',
        blocks: [
          { kind: 'list', items: ['Open the link in an incognito window to confirm it is publicly reachable.', 'Check that the page loads (not a 404) and the main feature works.', 'Submit the live URL and, for coding projects, your repository URL too.'] },
          { kind: 'callout', text: 'A live site alone is often not enough. If the project rubric inspects source code, you must also submit the public repository.' },
        ],
      },
    ],
    faqs: [
      { question: 'My deploy failed. What should I check?', answer: 'Read the build log. Common causes are a missing build command, a missing environment variable, or an error that only appears in production.' },
      { question: 'Is free hosting enough?', answer: 'Yes. Free tiers on Netlify, Vercel and GitHub Pages are fine for learning projects.' },
    ],
    cta: { label: 'Frontend track', href: '/tracks' },
    related: [
      { title: 'Create a public repository', href: '/submit-help/publish-a-public-github-repository', description: 'Deployment starts from GitHub.' },
      { title: 'Protect API keys and personal data', href: '/submit-help/protect-api-keys-and-personal-data', description: 'Keep keys out of the client.' },
    ],
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
  },

  'share-google-drive-files': {
    slug: 'share-google-drive-files',
    title: 'How to Share Google Drive Files So an Evaluator Can View Them',
    seoTitle: 'Share a Google Drive Link Correctly (Anyone With the Link)',
    description:
      'Set the correct Google Drive sharing permission so your file is viewable by an evaluator, and share the link that actually works.',
    openingAnswer:
      'Open the file in Google Drive, click Share, change General access to "Anyone with the link", set the role to "Viewer", then copy the link. If you leave it on "Restricted", nobody outside your account can open it.',
    intro:
      'The most common Google Drive mistake is sharing a link while leaving the file restricted. This guide walks through the exact permission change and how to verify it.',
    audiences: ['Document submitters', 'Design submitters', 'Data submitters'],
    sections: [
      {
        heading: 'Set the right sharing permission',
        blocks: [
          { kind: 'steps', items: [
            { title: 'Open the Share dialog', text: 'In Google Drive, right-click the file and choose Share, or open it and click the Share button.' },
            { title: 'Change General access', text: 'Under "General access", click the dropdown and choose "Anyone with the link".' },
            { title: 'Choose the role', text: 'Set the role to "Viewer" so people can read but not edit.' },
            { title: 'Copy the link', text: 'Click "Copy link" and keep that URL — this is what you submit.' },
          ] },
          { kind: 'callout', text: 'If the dropdown says "Restricted", re-open it and change it to "Anyone with the link". Restricted files cannot be opened by an evaluator.' },
        ],
      },
      {
        heading: 'Verify it works',
        blocks: [
          { kind: 'paragraph', text: 'Open the copied link in an incognito window while signed out of Google. If the file opens, sharing is correct. If you see "You need access", the file is still restricted.' },
        ],
      },
    ],
    faqs: [
      { question: 'Is "Anyone with the link" safe?', answer: 'Only share files that contain work you are happy to make public. Never share files with personal data or secrets.' },
      { question: 'Can the evaluator edit my file?', answer: 'No, if you set the role to Viewer. They can read and comment only if you allow it.' },
    ],
    cta: { label: 'Browse projects', href: '/projects' },
    related: [
      { title: 'Share a document or PDF deliverable', href: '/submit-help/share-a-document-deliverable', description: 'For written work.' },
      { title: 'Protect API keys and personal data', href: '/submit-help/protect-api-keys-and-personal-data', description: 'Before sharing publicly.' },
    ],
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
  },

  'share-a-document-deliverable': {
    slug: 'share-a-document-deliverable',
    title: 'How to Share a Google Docs, Word or PDF Deliverable',
    seoTitle: 'Submit a Document Deliverable (Docs, Word or PDF)',
    description:
      'Share a written deliverable as a publicly viewable Google Doc, or as a PDF, so it can be read and assessed.',
    openingAnswer:
      'Write your document in Google Docs, Word or similar, then either share the Google Doc as "Anyone with the link can view" or export it to PDF and share the PDF link. Make sure it opens in an incognito window.',
    intro:
      'Writing, planning and research projects are submitted as documents. The only requirement is that the final document is readable by an evaluator without signing in.',
    audiences: ['Technical writing learners', 'Project and product management learners', 'Marketing learners'],
    sections: [
      {
        heading: 'Option 1: Google Docs (recommended)',
        blocks: [
          { kind: 'steps', items: [
            { title: 'Write and format', text: 'Use clear headings, and include a title and your name or handle at the top.' },
            { title: 'Share as viewable', text: 'Click Share, set General access to "Anyone with the link", role "Viewer".' },
            { title: 'Copy the link', text: 'Submit the Google Docs link on TechSkillHub.' },
          ] },
        ],
      },
      {
        heading: 'Option 2: A PDF',
        blocks: [
          { kind: 'paragraph', text: 'If you used Word or another tool, export to PDF and upload it somewhere public, such as a public GitHub repository or Google Drive folder set to "Anyone with the link". Submit a direct link to the PDF.' },
        ],
      },
      {
        heading: 'What makes a strong submitted document',
        blocks: [
          { kind: 'list', items: ['A short introduction stating the purpose and audience', 'Clear structure with headings', 'Evidence, examples or reasoning — not just opinion', 'A conclusion or recommended next steps', 'References where you used outside sources'] },
        ],
      },
    ],
    faqs: [
      { question: 'Do images and charts count?', answer: 'Yes. Include them, but add a caption explaining what each one shows.' },
      { question: 'Can I submit a link that requires sign-in?', answer: 'No. Change the sharing setting so it opens for anyone with the link.' },
    ],
    cta: { label: 'Browse tracks', href: '/tracks' },
    related: [
      { title: 'Share Google Drive files', href: '/submit-help/share-google-drive-files', description: 'Set permissions correctly.' },
      { title: 'Write a project description', href: '/submit-help/write-a-project-description', description: 'Explain your work clearly.' },
    ],
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
  },

  'share-a-figma-prototype': {
    slug: 'share-a-figma-prototype',
    title: 'How to Share a Figma Prototype or Design File',
    seoTitle: 'Share a Figma Prototype or Design File Publicly',
    description:
      'Publish a viewable Figma link so a design evaluator can open your prototype or file, and understand how to present design decisions.',
    openingAnswer:
      'Open your Figma file, click Share, set the link sharing to "Anyone with the link can view", and copy the link. Use the Presentation or Prototype view so the reviewer sees the intended flow, not just the canvas.',
    intro:
      'Design work needs to be seen, not just described. Sharing a Figma file correctly lets an evaluator open your screens and prototype. If you cannot use Figma, an exported PDF or image set is an accepted alternative.',
    audiences: ['UI/UX learners', 'Product learners'],
    sections: [
      {
        heading: 'Publish the viewable link',
        blocks: [
          { kind: 'steps', items: [
            { title: 'Open the file', text: 'In Figma, open the file you want to share.' },
            { title: 'Click Share', text: 'Use the Share button in the top right.' },
            { title: 'Set link access', text: 'Change the link access to "Anyone with the link" and choose "can view".' },
            { title: 'Use the right view', text: 'Share the Prototype or Presentation link so the reviewer sees the intended flow.' },
            { title: 'Copy and verify', text: 'Copy the link and open it in an incognito window to confirm it opens without signing in.' },
          ] },
        ],
      },
      {
        heading: 'If you cannot use Figma',
        blocks: [
          { kind: 'list', items: ['Export the key screens as a PDF or image set', 'Upload the export to Google Drive set to "Anyone with the link"', 'Include a short written rationale that explains each screen'] },
        ],
      },
      {
        heading: 'Help the reviewer understand your design',
        blocks: [
          { kind: 'list', items: ['Name your frames clearly (for example "Checkout - step 1")', 'Show key states: empty, loading, error, success', 'Add a short rationale: the problem, your decisions and trade-offs', 'Note accessibility choices such as contrast and focus states'] },
        ],
      },
    ],
    faqs: [
      { question: 'Do I need a paid Figma plan?', answer: 'No. Free accounts can create files and share view links.' },
      { question: 'Can I share an exported image instead?', answer: 'Yes, if the project allows an export. A public PDF or image set downloaded from Figma is acceptable when the brief allows it.' },
    ],
    cta: { label: 'UI/UX track', href: '/tracks' },
    related: [
      { title: 'Write a project description', href: '/submit-help/write-a-project-description', description: 'Explain your design decisions.' },
      { title: 'Prepare a portfolio project', href: '/submit-help/prepare-a-portfolio-project', description: 'Package it for employers.' },
    ],
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
  },

  'submit-a-video-editing-project': {
    slug: 'submit-a-video-editing-project',
    title: 'How to Submit a Video Editing Project',
    seoTitle: 'Submit a Video Editing Project (Preview + Evidence)',
    description:
      'Share an accessible video preview and the supporting evidence a video-editing project needs, including your editing decisions.',
    openingAnswer:
      'Upload your edit to YouTube or Vimeo (a public or unlisted link is fine), set the link so anyone can watch it, then submit that link plus a short written explanation of your editing decisions.',
    intro:
      'Video projects are assessed from an accessible preview and a written explanation of what you edited and why. This guide covers how to share the video and what supporting evidence to include.',
    audiences: ['Video editing learners', 'YouTube learners'],
    sections: [
      {
        heading: 'Share an accessible preview',
        blocks: [
          { kind: 'steps', items: [
            { title: 'Upload to YouTube or Vimeo', text: 'Create a free account and upload your edited video.' },
            { title: 'Choose visibility', text: 'Either Public or Unlisted works. Unlisted means only people with the link can watch it.' },
            { title: 'Check the link', text: 'Open the link in an incognito window to confirm anyone can watch it without signing in.' },
            { title: 'Submit the link', text: 'Paste the video URL into the project submission form.' },
          ] },
          { kind: 'callout', text: 'TechSkillHub cannot automatically watch your video. It is assessed from your explanation and the other evidence you provide, so describe your work clearly.' },
        ],
      },
      {
        heading: 'Supporting evidence to include',
        blocks: [
          { kind: 'list', items: ['A written explanation of your editing decisions, pacing and structure', 'Key frames as screenshots if the project asks for them', 'The tools you used and your export settings where relevant', 'Any storyboard or planning notes'] },
        ],
      },
      {
        heading: 'Describe the actual edit',
        blocks: [
          { kind: 'paragraph', text: 'Explain the choices only an editor would make: where you cut and why, how you handled audio, how you used music and colour, and what you would improve. Avoid generic descriptions; reference specific moments in your video.' },
        ],
      },
    ],
    faqs: [
      { question: 'Should the video be public or unlisted?', answer: 'Either is fine as long as anyone with the link can watch it. Unlisted keeps it out of search while still shareable.' },
      { question: 'Do I need to upload the project files?', answer: 'Only if the project brief asks for them and you have a practical way to share them, such as a downloadable link.' },
    ],
    cta: { label: 'Video editing track', href: '/tracks' },
    related: [
      { title: 'Write a project description', href: '/submit-help/write-a-project-description', description: 'Describe your editing decisions.' },
      { title: 'Share Google Drive files', href: '/submit-help/share-google-drive-files', description: 'Share project files if required.' },
    ],
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
  },

  'write-a-project-description': {
    slug: 'write-a-project-description',
    title: 'How to Write a Project Description That Explains Your Actual Work',
    seoTitle: 'Write a Project Description That Shows What You Built',
    description:
      'Learn how to describe your project clearly enough to be assessed: the problem, what you built, how to see it, and the decisions you made.',
    openingAnswer:
      'Describe the problem and who it is for, what you built and which parts are your own work, how someone can see or run it, and the main decisions and limitations. Be specific to your own project, not generic.',
    intro:
      'The written explanation is part of every submission. A clear description helps an evaluator connect your artifacts to the requirements — and it also strengthens your portfolio.',
    audiences: ['All project submitters'],
    sections: [
      {
        heading: 'The four things to cover',
        blocks: [
          { kind: 'steps', items: [
            { title: 'Problem and audience', text: 'What problem does the project solve, and who is it for?' },
            { title: 'What you built', text: 'The main features and how they work. Say which parts are your own work.' },
            { title: 'How to see it', text: 'Where the live site, repository or file is, and how to run it if needed.' },
            { title: 'Decisions and limits', text: 'The key choices you made, alternatives you rejected, and what you would improve.' },
          ] },
        ],
      },
      {
        heading: 'Write specifically, not generically',
        blocks: [
          { kind: 'callout', text: 'A generic paragraph such as "I built a great app using modern technology" will not pass an assessment. Name your actual features, files and decisions.' },
          { kind: 'list', items: ['Reference specific screens, functions or files.', 'Explain a tricky bug and how you solved it.', 'State one real limitation honestly.'] },
        ],
      },
    ],
    faqs: [
      { question: 'How long should it be?', answer: 'Usually one to three short paragraphs, or the minimum word count shown next to the field.' },
      { question: 'Can I write about the process, not just the result?', answer: 'Yes, and you should. Decisions and trade-offs are what distinguish real work from a copied tutorial.' },
    ],
    cta: { label: 'Browse projects', href: '/projects' },
    related: [
      { title: 'Document testing', href: '/submit-help/document-testing-and-demonstrate-it-works', description: 'Show your project works.' },
      { title: 'Prepare a portfolio project', href: '/submit-help/prepare-a-portfolio-project', description: 'Turn it into portfolio evidence.' },
    ],
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
  },

  'document-testing-and-demonstrate-it-works': {
    slug: 'document-testing-and-demonstrate-it-works',
    title: 'How to Document Testing and Show That Your Project Works',
    seoTitle: 'Document Testing: Show Your Project Actually Works',
    description:
      'Add simple, honest evidence that your project works: tests, manual checks and screenshots of key behaviour.',
    openingAnswer:
      'Add a short testing section to your README: list what you checked, how you ran the tests, and the results. Include screenshots of the main feature working and of one edge case you handled.',
    intro:
      'Reviewers trust projects that demonstrate they work. You do not need a full test suite for every project — a few honest checks and screenshots go a long way.',
    audiences: ['Coding learners', 'Data learners', 'No-code builders'],
    sections: [
      {
        heading: 'What counts as good evidence',
        blocks: [
          { kind: 'list', items: ['Automated tests you ran, with the command and the passing output', 'Manual checks for the main flow and one edge case', 'Screenshots or a short screen recording of the feature working', 'A note on what is not yet handled'] },
        ],
      },
      {
        heading: 'Document it in your README',
        blocks: [
          { kind: 'steps', items: [
            { title: 'Add a Testing section', text: 'Describe how to run the tests, for example "npm test".' },
            { title: 'Record the results', text: 'Paste the passing output or describe the checks you performed.' },
            { title: 'Add screenshots', text: 'Include images of the main feature and an error or empty state.' },
          ] },
        ],
      },
      {
        heading: 'If you have no automated tests',
        blocks: [
          { kind: 'paragraph', text: 'That is acceptable for many beginner projects. Describe the manual checks you did instead: what you clicked, what you expected, and what happened. Honesty about untested areas is better than an exaggerated claim.' },
        ],
      },
    ],
    faqs: [
      { question: 'Do all projects need tests?', answer: 'Not all. Follow the project brief. Where tests are required, show the command and the output.' },
      { question: 'What is an edge case?', answer: 'An unusual input or situation, such as empty input, a very long value, or a failed network request.' },
    ],
    cta: { label: 'Browse tracks', href: '/tracks' },
    related: [
      { title: 'Organise files and write a README', href: '/submit-help/organise-files-and-write-a-readme', description: 'Where to document testing.' },
      { title: 'Write a project description', href: '/submit-help/write-a-project-description', description: 'Explain your decisions.' },
    ],
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
  },

  'protect-api-keys-and-personal-data': {
    slug: 'protect-api-keys-and-personal-data',
    title: 'How to Protect API Keys and Personal Data in Public Projects',
    seoTitle: 'Never Commit Secrets: Protect API Keys in Public Projects',
    description:
      'Keep passwords, API keys and personal data out of public repositories, and know what to do if you have already committed a secret.',
    openingAnswer:
      'Never put API keys, passwords, tokens or personal data in a public repository. Store them in a local .env file that is not committed, and put the real values into your host\'s environment variables. If you already committed a secret, remove it and change (rotate) the key.',
    intro:
      'Public repositories are scanned by bots looking for leaked keys. Leaked keys can be used to run up bills or access your accounts. This guide shows the safe pattern and how to recover from a mistake.',
    audiences: ['All project submitters', 'Beginners', 'Coding learners'],
    sections: [
      {
        heading: 'The safe pattern',
        blocks: [
          { kind: 'steps', items: [
            { title: 'Use environment variables', text: 'Read secrets from environment variables in your code, never hard-code them.' },
            { title: 'Keep a local .env file', text: 'Store the real values in a .env file on your computer only.' },
            { title: 'Add .env to .gitignore', text: 'This stops Git from tracking the file so it is never pushed.' },
            { title: 'Document the names only', text: 'In your README, list the variable names (for example WEATHER_API_KEY), not the values.' },
            { title: 'Set them on your host', text: 'Add the real values in your hosting provider\'s environment settings.' },
          ] },
          { kind: 'callout', text: 'TechSkillHub checks public repositories for obvious committed secrets and blocks submission if it finds one. It never copies the secret anywhere.' },
        ],
      },
      {
        heading: 'What never to include in a public artifact',
        blocks: [
          { kind: 'list', items: ['API keys, access tokens and passwords', 'Database connection strings with credentials', 'Real customer or personal data', 'Private documents or files you do not have permission to share'] },
        ],
      },
      {
        heading: 'If you already committed a secret',
        blocks: [
          { kind: 'steps', items: [
            { title: 'Rotate the key immediately', text: 'Generate a new key in the provider\'s dashboard and delete the old one. This is the most important step.' },
            { title: 'Remove it from the repository', text: 'Delete the file or the line and commit the change.' },
            { title: 'Understand history', text: 'The old value may still exist in the repository history, which is why rotating the key matters more than deleting the file.' },
          ] },
        ],
      },
    ],
    faqs: [
      { question: 'Is deleting the file enough?', answer: 'No. The value can remain in the repository history. Always rotate the key as well.' },
      { question: 'Do front-end keys count?', answer: 'Any secret that grants access or costs money must stay server-side. Public keys that are safe to expose are the only exception.' },
    ],
    cta: { label: 'Browse projects', href: '/projects' },
    related: [
      { title: 'Upload files to GitHub', href: '/submit-help/upload-project-files-to-github', description: 'What not to upload.' },
      { title: 'Publish a live frontend project', href: '/submit-help/publish-and-share-a-live-frontend-project', description: 'Set secrets on your host.' },
    ],
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
  },

  'prepare-a-portfolio-project': {
    slug: 'prepare-a-portfolio-project',
    title: 'How to Prepare a Portfolio Project for Assessment',
    seoTitle: 'Prepare a Portfolio Project (and Present It Well)',
    description:
      'Turn a finished project into credible portfolio evidence: a clear description, working links, evidence of testing and an honest account of your contribution.',
    openingAnswer:
      'Package your project with a clear description, a working public link (or a repository plus a demo), evidence that it works, and an honest note on your own contribution. Then present it as a short case study an employer can skim.',
    intro:
      'Portfolio projects are the projects you show to employers or clients. Preparing them well means making your work easy to find, easy to understand and easy to trust.',
    audiences: ['All learners', 'Career switchers', 'Freelancers'],
    sections: [
      {
        heading: 'Checklist for a portfolio-ready project',
        blocks: [
          { kind: 'list', items: ['A clear one-line description of what it does and who it is for', 'A public repository (for code) and a working demo link where possible', 'A README that explains how to run it', 'Evidence it works: tests, screenshots or a short demo', 'An honest note on which parts you built yourself', 'A short case study: problem, approach, decisions, result'] },
        ],
      },
      {
        heading: 'Write a short case study',
        blocks: [
          { kind: 'steps', items: [
            { title: 'Problem', text: 'One or two sentences on the problem and the audience.' },
            { title: 'Approach', text: 'What you built and the main technical or design decisions.' },
            { title: 'Result', text: 'What works, and any measured outcome.' },
            { title: 'Reflection', text: 'What you would improve next.' },
          ] },
        ],
      },
      {
        heading: 'Be honest and specific',
        blocks: [
          { kind: 'callout', text: 'Do not claim deployment, user numbers or results you cannot show. Reviewers value an honest, specific account over impressive but vague claims.' },
        ],
      },
    ],
    faqs: [
      { question: 'How many projects do I need?', answer: 'Three to five strong, well-documented projects usually matter more than many unfinished ones.' },
      { question: 'Do I need a live deployment?', answer: 'Where a safe local demo or a clear README is more appropriate, that is acceptable. If the project brief requires a live link, provide one.' },
    ],
    cta: { label: 'Browse tracks', href: '/tracks' },
    related: [
      { title: 'Write a project description', href: '/submit-help/write-a-project-description', description: 'Describe your work clearly.' },
      { title: 'Document testing', href: '/submit-help/document-testing-and-demonstrate-it-works', description: 'Show it works.' },
    ],
    publishedTime: PUBLISHED,
    modifiedTime: UPDATED,
  },
}

export const SUBMISSION_GUIDE_LIST = Object.values(SUBMISSION_GUIDE_CONTENT).map((guide) => ({
  slug: guide.slug,
  title: guide.title,
  description: guide.description,
}))
