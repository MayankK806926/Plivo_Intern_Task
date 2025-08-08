"use client";
// import * as React from 'react';
import * as React from 'react';
import LoginPage from './auth/login/page';
import SkillSelector from '../components/SkillSelector';
import ConversationAnalysis from '../components/ConversationAnalysis';
import ImageAnalysis from '../components/ImageAnalysis';
import DocumentSummarization from '../components/DocumentSummarization';

export default function HomePage() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [skill, setSkill] = React.useState('conversation');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setLoggedIn(localStorage.getItem('playground_logged_in') === 'true');
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    if (email === 'abciitian@gmail.com' && password === 'abciitian') {
      localStorage.setItem('playground_logged_in', 'true');
      setLoggedIn(true);
    }
  };

  if (!loggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const handleLogout = () => {
    localStorage.removeItem('playground_logged_in');
    setLoggedIn(false);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        >
          Log out
        </button>
      </div>
      <SkillSelector value={skill} onChange={setSkill} />
      <div className="mt-8">
        {skill === 'conversation' && <ConversationAnalysis />}
        {skill === 'image' && <ImageAnalysis />}
        {skill === 'summarize' && <DocumentSummarization />}
      </div>
    </div>
  );
}
