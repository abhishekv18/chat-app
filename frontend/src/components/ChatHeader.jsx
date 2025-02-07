import { DeleteIcon, Trash, X } from "lucide-react";

import { useChatStore } from "../store/userChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, deleteMessages } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
       
        {/* Close button */}
        <div className="flex gap-2">
          <div className="border border-base-300 shadow-md ">
          <button onClick={() => deleteMessages(selectedUser._id)} className="flex items-center p-1 gap-1">
           <p className="">Clear Chat</p>
        </button>
          </div>
      <div>
      <button onClick={() => setSelectedUser(null)} className="mt-1">
          <X />
        </button>
      </div>
        
        </div>
      
      </div>
    </div>
  );
};
export default ChatHeader;