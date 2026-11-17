export interface Profile {
    id: string;
    name: string;
    age: number;
    photo: string;
    bio: string;
    city: string;
    interests: string[];
  }
  
  export type SwipeAction = "LIKE" | "PASS";
  
  export interface Swipe {
    swiperId: string;
    swipedUserId: string;
    action: SwipeAction;
    createdAt: string;
  }
  
  export interface Match {
    id: string;
    userOneId: string;
    userTwoId: string;
    createdAt: string;
  }
  