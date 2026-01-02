import { Check, Trash2 } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

interface ChecklistItemProps {
  item: {
    id: string;
    item_fr: string;
    item_en: string;
    completed: boolean;
    category: string;
  };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ChecklistItem({ item, onToggle, onDelete }: ChecklistItemProps) {
  const { language } = useLanguage();
  const text = language === 'fr' ? item.item_fr : item.item_en;

  return (
    <div className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(item.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
            item.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-blue-500'
          }`}
        >
          {item.completed && <Check className="w-4 h-4 text-white" />}
        </button>

        <span className={`flex-1 ${item.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
          {text}
        </span>

        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
          {item.category}
        </span>

        <button
          onClick={() => onDelete(item.id)}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
}
