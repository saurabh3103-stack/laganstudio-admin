import React, { useRef, useEffect } from 'react';

export default function RichTextEditor({ value, onChange, placeholder = "Write your beautiful article content here..." }) {
    const editorRef = useRef(null);

    // Track initialization to avoid cursor jumping
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || '';
        }
    }, []);

    // Handle internal change and sync to React parent state
    const handleInput = () => {
        if (editorRef.current) {
            const html = editorRef.current.innerHTML;
            onChange(html === '<br>' ? '' : html);
        }
    };

    // Execute standard document text commands safely
    const execCmd = (command, arg = null) => {
        document.execCommand(command, false, arg);
        handleInput();
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    // Prompt user to add links beautifully
    const addLink = () => {
        const url = prompt("Enter the absolute URL (e.g. https://google.com):");
        if (url) {
            execCmd('createLink', url);
        }
    };

    return (
        <div className="border border-gray-200 rounded-3xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all flex flex-col min-h-[400px]">
            {/* Control Toolbar */}
            <div className="bg-gray-50/80 px-4 py-2 border-b border-gray-150 flex flex-wrap gap-1 items-center select-none">
                
                {/* Headers */}
                <button
                    type="button"
                    onClick={() => execCmd('formatBlock', '<h2>')}
                    className="p-2 hover:bg-gray-200/70 rounded-lg text-xs font-black text-gray-700"
                    title="Heading 2"
                >
                    H2
                </button>
                <button
                    type="button"
                    onClick={() => execCmd('formatBlock', '<h3>')}
                    className="p-2 hover:bg-gray-200/70 rounded-lg text-xs font-black text-gray-700"
                    title="Heading 3"
                >
                    H3
                </button>
                <button
                    type="button"
                    onClick={() => execCmd('formatBlock', '<p>')}
                    className="p-2 hover:bg-gray-200/70 rounded-lg text-xs font-bold text-gray-500"
                    title="Paragraph"
                >
                    Body
                </button>

                <div className="w-[1px] h-5 bg-gray-200 mx-1"></div>

                {/* Inline Formatting */}
                <button
                    type="button"
                    onClick={() => execCmd('bold')}
                    className="p-2 hover:bg-gray-200/70 rounded-lg text-gray-700"
                    title="Bold"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
                        <path d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => execCmd('italic')}
                    className="p-2 hover:bg-gray-200/70 rounded-lg text-gray-700"
                    title="Italic"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="19" y1="4" x2="10" y2="4" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="14" y1="20" x2="5" y2="20" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="15" y1="4" x2="9" y2="20" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => execCmd('underline')}
                    className="p-2 hover:bg-gray-200/70 rounded-lg text-gray-700"
                    title="Underline"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M6 3v7a6 6 0 0012 0V3" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="4" y1="21" x2="20" y2="21" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="w-[1px] h-5 bg-gray-200 mx-1"></div>

                {/* Lists & Alignment */}
                <button
                    type="button"
                    onClick={() => execCmd('insertUnorderedList')}
                    className="p-2 hover:bg-gray-200/70 rounded-lg text-gray-700"
                    title="Bullet List"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="8" y1="6" x2="21" y2="6" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="8" y1="12" x2="21" y2="12" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="8" y1="18" x2="21" y2="18" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="3" y1="6" x2="3.01" y2="6" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="3" y1="12" x2="3.01" y2="12" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="3" y1="18" x2="3.01" y2="18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => execCmd('formatBlock', '<blockquote>')}
                    className="p-2 hover:bg-gray-200/70 rounded-lg text-gray-700 font-serif italic text-lg leading-none"
                    title="Quote Block"
                >
                    “
                </button>
                <button
                    type="button"
                    onClick={() => execCmd('justifyLeft')}
                    className="p-2 hover:bg-gray-200/70 rounded-lg text-gray-700"
                    title="Align Left"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="17" y1="10" x2="3" y2="10" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="21" y1="6" x2="3" y2="6" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="21" y1="14" x2="3" y2="14" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="17" y1="18" x2="3" y2="18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => execCmd('justifyCenter')}
                    className="p-2 hover:bg-gray-200/70 rounded-lg text-gray-700"
                    title="Align Center"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="18" y1="10" x2="6" y2="10" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="21" y1="6" x2="3" y2="6" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="21" y1="14" x2="3" y2="14" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="18" y1="18" x2="6" y2="18" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <div className="w-[1px] h-5 bg-gray-200 mx-1"></div>

                {/* Links & Clear */}
                <button
                    type="button"
                    onClick={addLink}
                    className="p-2 hover:bg-gray-200/70 rounded-lg text-gray-700"
                    title="Insert Link"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button
                    type="button"
                    onClick={() => execCmd('removeFormat')}
                    className="p-2 hover:bg-gray-200/70 rounded-lg text-red-500 hover:text-red-700"
                    title="Clear Formatting"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <polyline points="3 6 5 6 21 6" strokeLinecap="round" strokeLinejoin="round" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="14" y1="11" x2="14" y2="17" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

            </div>

            {/* Editable Content Frame */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="flex-1 p-6 outline-none prose prose-indigo max-w-none min-h-[350px] overflow-y-auto text-sm text-gray-800 leading-relaxed font-normal"
                placeholder={placeholder}
                style={{
                    minHeight: '350px'
                }}
            ></div>
            
            {/* Formatting Guideline/Cheat Sheet */}
            <div className="px-6 py-2 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                <span>WYSIWYG Rich Text Mode</span>
                <span className="text-indigo-500 italic">Auto-saves to post body</span>
            </div>
        </div>
    );
}
