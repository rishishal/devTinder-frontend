import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SkillChipInputProps {
  value?: string[];
  onChange?: (skills: string[]) => void;
}

export default function SkillChipInput({
  value = [],
  onChange,
}: SkillChipInputProps) {
  const [skills, setSkills] = useState<string[]>(value);
  const [input, setInput] = useState("");

  const handleAddSkill = () => {
    if (input.trim() && !skills.includes(input.trim())) {
      const newSkills = [...skills, input.trim()];
      setSkills(newSkills);
      onChange?.(newSkills);
      setInput("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
    onChange?.(newSkills);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="p-6">
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a skill and press Enter"
          />
          <Button type="button" onClick={handleAddSkill}>
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
            >
              <p className="text-sm">{skill}</p>
              <button
                type="button"
                onClick={() => handleRemoveSkill(index)}
                aria-label={`Remove ${skill}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {skills.length === 0 && (
          <p className="text-gray-400 text-sm text-center py-4">
            No skills added yet
          </p>
        )}
      </div>
    </div>
  );
}
