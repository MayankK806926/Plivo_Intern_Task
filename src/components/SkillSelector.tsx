type SkillSelectorProps = {
  value: string;
  onChange: (val: string) => void;
};

const skills = [
  { value: 'conversation', label: 'Conversation Analysis' },
  { value: 'image', label: 'Image Analysis' },
  { value: 'summarize', label: 'Document/URL Summarization' },
];

export default function SkillSelector({ value, onChange }: SkillSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="skill" className="font-medium">Select Skill</label>
      <select
        id="skill"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="border rounded px-3 py-2 bg-gray-100 focus:outline-none focus:ring"
      >
        {skills.map(skill => (
          <option key={skill.value} value={skill.value}>{skill.label}</option>
        ))}
      </select>
    </div>
  );
}
