import { create } from 'zustand';

interface MemberData {
  memberId: number;
  name: string;
  picture: string | null;
}

interface MemberState {
  member: MemberData | null;

  setMember: (member: MemberData | null) => void;
}

const useMemberStore = create<MemberState>((set) => ({
  member: null,

  setMember: (member) => set({ member }),
}));

export default useMemberStore;
