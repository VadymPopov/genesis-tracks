# 🎵 SoundWaves – Music Track Management App

**SoundWaves** is a sleek and modern music track management system built with **Next.js**, **React**, and other cutting-edge technologies. It allows users to create, upload, edit, and manage audio tracks — complete with metadata, genre tags, cover art, and an inline audio player.

## 🚀 Features

- 🎼 **Create Track**: Add a new track with metadata (title, artist, album, genres, cover image URL).
- ✏️ **Edit Track**: Update track details directly in a form modal.
- 🗑 **Delete Track**: Remove unwanted tracks from the list and database.
- 📤 **Upload Audio**: Upload MP3 or WAV files and preview them instantly.
- 📄 **Track List**: View a sortable, filterable, and paginated list of all tracks.
- 🔎 **Search**: Find tracks by title, artist, or album using instant search.
- 🏷 **Genres and Tags**: Add multiple genres dynamically using tag-style inputs.
- ▶️ **Inline Audio Player**: Listen to audio directly from the track list.
- ⏳ **Loading States**: Visual indicators while loading data or submitting forms.
- ✅ **Client-side Validation**: Real-time validation with helpful error messages.

## 🛠 Technologies Used

- **Next.js** – React framework with server-side rendering
- **React** – Component-based UI library
- **TypeScript** – Strong typing for scalable development
- **Tailwind CSS** – Utility-first styling
- **React Hook Form** – Simple and performant form handling
- **Zod** – Schema validation for robust forms
- **Axios** – HTTP client for API interactions
- **SWR** – Data fetching and caching
- **shadcn/ui** – Accessible, unstyled component primitives
- **Lucide React** – Beautiful, customizable icons
- **Lodash** – Helpful utility functions
- **clsx** – Conditional CSS class utility
- **React Spinners** – Smooth loading indicators

## 📸 Screenshots

![Track List](/screenshots/screenshot_main.jpg)
![Edit Modal](/screenshots/screenshot_edit.jpg)

## 🌐 Live Demo

[🔗 View Live App](https://your-live-demo-link.com)

## 🧰 Installation & Setup

### Prerequisites

- **Node.js** version `20.13.1` or higher
- **npm** or **yarn**

### Local Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/VadymPopov/genesis-tracks.git

   ```

2. Navigate to the project folder:

   ```bash
   cd <genesis-tracks>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
5. Visit the app in your browser at `http://localhost:3000`

## Project Structure

The project contains the following key components:

- **Main Page**: Displays a list of tracks and provides options to create, edit, delete, and upload tracks.
- **Track Form**: Modal dialog for creating and editing track metadata.
- **Audio Player**: Inline audio player for playing uploaded music files.
- **Track List**: Displays all tracks with options for pagination, sorting, and filtering.
- **Search**: Search input field to find tracks by title, artist, or album.
- **Genre and Artist Filters**: Dropdown filters to narrow down the track list by genre or artist.
