export type CardRank = "J" | "Q" | "K" | "A" | "JOKER";

export interface TCard {
  id: string;
  rank: CardRank;
}

export interface Player {
  id: string;
  name: string;
  hand: TCard[];
  cardsInHand?: number;
}
