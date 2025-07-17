import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiBook, FiBookmark, FiShare2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import AuthorLayout from '../../Component/Author/AuthorLayout';

// Mock data - in a real app, this would come from an API
const mockBookData = {
  id: 1,
  title: "The Great Adventure",
  author: "John Doe",
  description: "An epic tale of courage and discovery across uncharted lands.",
  coverImage: "https://via.placeholder.com/300x450",
  publishedDate: "2023-10-15",
  chapters: [
    {
      id: 1,
      title: "Chapter I: The Beginning",
      content: `
        <h2>Chapter I: The Beginning</h2>
        <p>The sun rose over the quiet village of Eldermere, casting long shadows across the dew-covered grass. It was here that our story begins, with a young boy named Eli who knew nothing of the adventures that awaited him.</p>
        <p>Eli stretched and yawned as he stepped out of his small cottage. The air smelled of fresh bread from the bakery down the lane, mixed with the salty tang of the sea breeze.</p>
        <img src="https://via.placeholder.com/600x300" alt="Village scene" class="my-4 rounded-lg mx-auto" />
        <p>"Today feels different," Eli muttered to himself, though he couldn't say why. Perhaps it was the way the birds seemed to be singing just for him, or how the wind carried whispers of distant lands.</p>
      `,
    },
    {
      id: 2,
      title: "Chapter II: The Mysterious Map",
      content: `
        <h2>Chapter II: The Mysterious Map</h2>
        <p>While cleaning the attic of the village elder's house, Eli stumbled upon an old chest covered in dust. The lock was rusted shut, but with some effort, it gave way.</p>
        <p>Inside, wrapped in faded blue cloth, was a map unlike any Eli had ever seen. The parchment was yellowed with age, and the ink had faded in places, but the landmarks were still visible.</p>
        <blockquote class="border-l-4 border-indigo-500 pl-4 my-4 italic">
          "He who follows the path of the ancients shall find what was lost to time."
        </blockquote>
        <p>The words sent a shiver down Eli's spine. Could this be a treasure map? And why did it feel like it was calling to him?</p>
      `,
    },
    {
      id: 3,
      title: "Chapter III: The Journey Begins",
      content: `
        <h2>Chapter III: The Journey Begins</h2>
        <p>With nothing but the clothes on his back and the mysterious map tucked safely in his pack, Eli set out at dawn. The village gates creaked as he pushed them open, stepping onto the road that led to the unknown.</p>
        <p>The first day of travel was uneventful. Eli passed farmers tending their fields and merchants heading to market. But as the sun began to set, he reached the edge of the known world - the Darkwood Forest.</p>
        <div class="grid grid-cols-2 gap-4 my-4">
          <img src="https://via.placeholder.com/300x200" alt="Darkwood Forest" class="rounded-lg" />
          <img src="https://via.placeholder.com/300x200" alt="Eli at forest edge" class="rounded-lg" />
        </div>
        <p>According to the map, the first clue lay somewhere within these ancient trees. Taking a deep breath, Eli stepped into the shadows of the Darkwood.</p>
      `,
    }
  ]
};

const BookPage = () => {
  const { id } = useParams();
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [theme, setTheme] = useState('light');

  const book = mockBookData; // In real app, fetch by id
  const currentChapter = book.chapters[currentChapterIndex];

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < book.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In real app, would save to user's bookmarks
  };

  const shareBook = () => {
    // In real app, would implement share functionality
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const fontSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl'
  };

  const themeClasses = {
    light: 'bg-white text-gray-900',
    sepia: 'bg-amber-50 text-amber-900',
    dark: 'bg-gray-900 text-gray-100'
  };

  return (
    <AuthorLayout>
      <div className={`min-h-screen ${themeClasses[theme]}`}>
        {/* Book Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="sticky top-8">
                <img 
                  src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=450&q=80" 
                  alt={`${book.title} cover`} 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <div className="mt-4 flex space-x-2">
                  <button 
                    onClick={toggleBookmark}
                    className={`flex items-center px-3 py-1 rounded-md ${isBookmarked ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    <FiBookmark className="mr-1" />
                    {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                  </button>
                  <button 
                    onClick={shareBook}
                    className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    <FiShare2 className="mr-1" /> Share
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3 lg:w-3/4">
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-lg text-gray-600 mb-4">By {book.author}</p>
              <p className="mb-6">{book.description}</p>

              {/* Reading Controls */}
              <div className="flex flex-wrap items-center gap-4 mb-6 p-3 bg-gray-100 rounded-lg">
                <div className="flex items-center">
                  <span className="mr-2">Text:</span>
                  <select 
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xlarge">Extra Large</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">Theme:</span>
                  <select 
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="light">Light</option>
                    <option value="sepia">Sepia</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
              </div>

              {/* Chapter Navigation */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <FiBook className="mr-2" /> {currentChapter.title}
                </h2>
                <div className="text-sm text-gray-500">
                  Chapter {currentChapterIndex + 1} of {book.chapters.length}
                </div>
              </div>

              {/* Chapter Content */}
              <div 
                className={`prose max-w-none ${fontSizeClasses[fontSize]} ${theme === 'dark' ? 'prose-invert' : ''} ${theme === 'sepia' ? 'prose-amber' : ''}`}
                dangerouslySetInnerHTML={{ __html: currentChapter.content }}
              />

              {/* Chapter Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <button
                  onClick={handlePrevChapter}
                  disabled={currentChapterIndex === 0}
                  className={`flex items-center px-4 py-2 rounded-md ${currentChapterIndex === 0 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                >
                  <FiChevronLeft className="mr-1" /> Previous
                </button>
                <button
                  onClick={handleNextChapter}
                  disabled={currentChapterIndex === book.chapters.length - 1}
                  className={`flex items-center px-4 py-2 rounded-md ${currentChapterIndex === book.chapters.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                >
                  Next <FiChevronRight className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthorLayout>
  );
};

export default BookPage;