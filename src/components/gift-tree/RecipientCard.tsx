import React from "react";
import { Trash2, SquarePen } from "lucide-react";
import { Recipient } from "./types";

interface RecipientCardProps {
  recipient: Recipient;
  onEdit: (recipient: Recipient) => void;
  onDelete: (id: number) => void;
}

const RecipientCard: React.FC<RecipientCardProps> = ({
  recipient,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-md">
      <div className="flex justify-between items-start p-4 border-b">
        <h3 className="text-lg font-bold text-gray-900">
          {recipient.firstName} {recipient.lastName}
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(recipient)}
            className="transition-colors text-sm font-medium"
          >
            <SquarePen className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDelete(recipient.id)}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-3 text-sm p-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Email:</span>
          <span className="text-gray-900">{recipient.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Phone Number:</span>
          <span className="text-gray-900">{recipient.phoneNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Number Of Trees:</span>
          <span className="text-gray-900 font-semibold">{recipient.trees}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipientCard;
