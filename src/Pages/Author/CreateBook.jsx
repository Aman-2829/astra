import React from 'react';
import { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiSave, FiUpload, FiImage } from 'react-icons/fi';
import AuthorLayout from '../../Component/Author/AuthorLayout';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import FontFamily from '@tiptap/extension-font-family';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';

const ChapterEditor = ({ content, onUpdate }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      FontFamily,
      TextStyle,
      Color,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onUpdate(editor.getHTML());
    },
  });

  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2 p-2 border rounded-t-lg bg-gray-50">
        {/* Font Family */}
        <select
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          value={editor.getAttributes('textStyle').fontFamily || ''}
          className="text-sm border rounded p-1"
        >
          <option value="">Default</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
          <option value="Comic Sans MS">Comic Sans</option>
        </select>

        {/* Font Size */}
        <select
          onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
          value={editor.getAttributes('textStyle').fontSize || ''}
          className="text-sm border rounded p-1"
        >
          <option value="">Size</option>
          <option value="12px">Small</option>
          <option value="16px">Normal</option>
          <option value="20px">Large</option>
          <option value="24px">XL</option>
          <option value="32px">XXL</option>
        </select>

        {/* Text Color */}
        <input
          type="color"
          onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
          value={editor.getAttributes('textStyle').color || '#000000'}
          className="w-8 h-8"
        />

        {/* Background Color */}
        <input
          type="color"
          onInput={(e) => editor.chain().focus().setBackgroundColor(e.target.value).run()}
          value={editor.getAttributes('textStyle').backgroundColor || '#ffffff'}
          className="w-8 h-8"
        />

        {/* Basic Text Styles */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1 rounded ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1 rounded ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
          title="Underline"
        >
          <u>U</u>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1 rounded ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
          title="Strikethrough"
        >
          <s>S</s>
        </button>

        {/* Alignment */}
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-1 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}`}
          title="Align Left"
        >
          ≡
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-1 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}`}
          title="Align Center"
        >
          ≡
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-1 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}`}
          title="Align Right"
        >
          ≡
        </button>

        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
          title="Bullet List"
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
          title="Numbered List"
        >
          1. List
        </button>

        {/* Image */}
        <button
          onClick={addImage}
          className="p-1 rounded flex items-center"
          title="Insert Image"
        >
          <FiImage className="mr-1" /> Image
        </button>

        {/* More formatting options can be added here */}
      </div>

      {/* Editor Content */}
        <EditorContent className="border rounded-b-lg p-4 min-h-96 focus:outline-none focus:ring-1 focus:ring-indigo-500"editor={editor} />
    </div>
  );
};

export default function BookCreator() {
  const romanNumerals = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ'];
  const [bookTitle, setBookTitle] = useState('Untitled Book');
  const [bookDescription, setBookDescription] = useState('');
  const [bookCover, setBookCover] = useState(null);
  const [chapters, setChapters] = useState([
    { id: 1, title: 'Chapter Ⅰ', content: '<p>Start writing your first chapter...</p>', isEditing: false }
  ]);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const addChapter = () => {
    const newChapter = {
      id: Date.now(),
      title: `Chapter ${romanNumerals[chapters.length % romanNumerals.length]}`,
      content: '<p></p>',
      isEditing: false
    };
    setChapters([...chapters, newChapter]);
    setActiveChapter(chapters.length);
  };

  const deleteChapter = (index) => {
    if (chapters.length <= 1) return;
    const newChapters = chapters.filter((_, i) => i !== index);
    setChapters(newChapters);
    setActiveChapter(Math.min(activeChapter, newChapters.length - 1));
  };

  const updateChapterContent = (index, content) => {
    const updatedChapters = [...chapters];
    updatedChapters[index].content = content;
    setChapters(updatedChapters);
  };

  const toggleChapterTitleEdit = (index) => {
    const updatedChapters = [...chapters];
    updatedChapters[index].isEditing = !updatedChapters[index].isEditing;
    setChapters(updatedChapters);
  };

  const updateChapterTitle = (index, newTitle) => {
    const updatedChapters = [...chapters];
    updatedChapters[index].title = newTitle;
    updatedChapters[index].isEditing = false;
    setChapters(updatedChapters);
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookCover(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AuthorLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-1/3">
              <div className="aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                {bookCover ? (
                  <img src={bookCover} alt="Book cover" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <label className="cursor-pointer">
                      <FiUpload className="mx-auto text-3xl text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">Upload Cover Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-2/3">
              {isEditingTitle ? (
                <input
                  type="text"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  className="text-2xl font-bold w-full mb-4 p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  autoFocus
                />
              ) : (
                <h1
                  className="text-2xl font-bold mb-4 cursor-text"
                  onClick={() => setIsEditingTitle(true)}
                >
                  {bookTitle}
                </h1>
              )}
              <textarea
                value={bookDescription}
                onChange={(e) => setBookDescription(e.target.value)}
                placeholder="Enter book description..."
                className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 mb-4"
              />
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center">
                  <FiSave className="mr-2" /> Save Draft
                </button>
                <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md">
                  Preview Book
                </button>
              </div>
            </div>
          </div>

          {/* Chapter Navigation */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Chapters</h2>
            <button
              onClick={addChapter}
              className="flex items-center px-3 py-1 bg-green-600 text-white rounded-md text-sm"
            >
              <FiPlus className="mr-1" /> Add Chapter
            </button>
          </div>

          <div className="flex overflow-x-auto pb-2 mb-6">
            <div className="flex space-x-2">
              {chapters.map((chapter, index) => (
                <div
                  key={chapter.id}
                  className={`flex items-center px-4 py-2 rounded-md cursor-pointer ${
                    activeChapter === index
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveChapter(index)}
                >
                  {chapter.isEditing ? (
                    <input
                      type="text"
                      value={chapter.title}
                      onChange={(e) => {
                        const updatedChapters = [...chapters];
                        updatedChapters[index].title = e.target.value;
                        setChapters(updatedChapters);
                      }}
                      onBlur={() => updateChapterTitle(index, chapter.title)}
                      onKeyPress={(e) => e.key === 'Enter' && updateChapterTitle(index, chapter.title)}
                      className="bg-transparent border-b border-white focus:outline-none"
                      autoFocus
                    />
                  ) : (
                    <span
                      className="mr-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleChapterTitleEdit(index);
                      }}
                    >
                      {chapter.title}
                    </span>
                  )}
                  {chapters.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChapter(index);
                      }}
                      className="ml-2 text-red-300 hover:text-white"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Chapter Editor */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {chapters[activeChapter]?.title || 'Select a chapter'}
              </h3>
              <button
                onClick={() => toggleChapterTitleEdit(activeChapter)}
                className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
              >
                <FiEdit2 className="mr-1" /> Rename
              </button>
            </div>
            
            <ChapterEditor
              content={chapters[activeChapter]?.content || ''}
              onUpdate={(content) => updateChapterContent(activeChapter, content)}
            />
          </div>

          <div className="flex justify-between">
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                Save Chapter
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                View Previous Version
              </button>
            </div>
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Publish Book
            </button>
          </div>
        </div>
      </div>
    </AuthorLayout>
  );
}