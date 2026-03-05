import { afterEach, describe, expect, it, vi } from "vitest";
import Bucket from "../../../lib/bucket";

describe("Bucket", () => {
  // ========================================
  // Tests du Constructor
  // ========================================

  describe("constructor", () => {
    it("should create bucket with items", () => {
      const bucket = new Bucket(["a", "b", "c"]);

      expect(bucket.length).toBe(3);
      expect(bucket.items).toEqual(["a", "b", "c"]);
    });

    it("should create bucket with empty list", () => {
      const bucket = new Bucket<string>([]);

      expect(bucket.length).toBe(0);
      expect(bucket.items).toEqual([]);
    });

    it("should create independent copy of input array", () => {
      const original = ["a", "b", "c"];
      const bucket = new Bucket(original);

      // Modifier l'original ne doit pas affecter le bucket
      original.push("d");

      expect(bucket.length).toBe(3);
      expect(bucket.items).toEqual(["a", "b", "c"]);
    });

    it("should work with numbers", () => {
      const bucket = new Bucket([1, 2, 3, 4, 5]);

      expect(bucket.length).toBe(5);
    });

    it("should work with objects", () => {
      const items = [
        { id: 1, name: "item1" },
        { id: 2, name: "item2" },
      ];
      const bucket = new Bucket(items);

      expect(bucket.length).toBe(2);
      expect(bucket.items).toEqual(items);
    });

    it("should handle single item", () => {
      const bucket = new Bucket(["only"]);

      expect(bucket.length).toBe(1);
      expect(bucket.items).toEqual(["only"]);
    });

    it("should preserve duplicate items", () => {
      const bucket = new Bucket(["a", "b", "a", "c", "a"]);

      expect(bucket.length).toBe(5);
      expect(bucket.items).toEqual(["a", "b", "a", "c", "a"]);
    });
  });

  // ========================================
  // Tests de draw() - Comportement Aléatoire
  // ========================================

  describe("draw - random behavior", () => {
    it("should draw an item from the bucket", () => {
      const bucket = new Bucket(["a", "b", "c"]);

      const drawn = bucket.draw();

      expect(["a", "b", "c"]).toContain(drawn);
      expect(bucket.length).toBe(2);
    });

    it("should remove drawn item from bucket", () => {
      const bucket = new Bucket(["a", "b", "c"]);

      const drawn = bucket.draw();

      expect(bucket.items).not.toContain(drawn);
      expect(bucket.length).toBe(2);
    });

    it("should draw all items eventually", () => {
      const bucket = new Bucket(["a", "b", "c"]);
      const drawn: string[] = [];

      drawn.push(bucket.draw());
      drawn.push(bucket.draw());
      drawn.push(bucket.draw());

      expect(drawn.sort()).toEqual(["a", "b", "c"]);
      expect(bucket.length).toBe(0);
    });

    it("should handle drawing from bucket with duplicates", () => {
      const bucket = new Bucket(["a", "a", "a"]);

      const first = bucket.draw();
      expect(first).toBe("a");
      expect(bucket.length).toBe(2);

      const second = bucket.draw();
      expect(second).toBe("a");
      expect(bucket.length).toBe(1);
    });
  });

  // ========================================
  // Tests de draw() - Déterministe (Mock Random)
  // ========================================

  describe("draw - deterministic (mocked random)", () => {
    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should draw first item when random returns 0", () => {
      vi.spyOn(Math, "random").mockReturnValue(0);

      const bucket = new Bucket(["first", "second", "third"]);
      const drawn = bucket.draw();

      expect(drawn).toBe("first");
      expect(bucket.items).toEqual(["second", "third"]);
    });

    it("should draw middle item when random returns 0.5", () => {
      // 0.5 * 3 = 1.5 -> floor = 1 (index 1)
      vi.spyOn(Math, "random").mockReturnValue(0.5);

      const bucket = new Bucket(["first", "second", "third"]);
      const drawn = bucket.draw();

      expect(drawn).toBe("second");
      expect(bucket.items).toEqual(["first", "third"]);
    });

    it("should draw last item when random returns 0.99", () => {
      // 0.99 * 3 = 2.97 -> floor = 2 (index 2, dernier élément)
      vi.spyOn(Math, "random").mockReturnValue(0.99);

      const bucket = new Bucket(["first", "second", "third"]);
      const drawn = bucket.draw();

      expect(drawn).toBe("third");
      expect(bucket.items).toEqual(["first", "second"]);
    });

    it("should draw items in sequence with controlled randomness", () => {
      const randomMock = vi.spyOn(Math, "random");

      // Premier draw: index 1 (middle)
      randomMock.mockReturnValueOnce(0.4); // 0.4 * 3 = 1.2 -> 1
      // Deuxième draw: index 1 (ce qui était le dernier)
      randomMock.mockReturnValueOnce(0.6); // 0.6 * 2 = 1.2 -> 1
      // Troisième draw: index 0 (seul restant)
      randomMock.mockReturnValueOnce(0);

      const bucket = new Bucket(["a", "b", "c"]);

      expect(bucket.draw()).toBe("b");
      expect(bucket.items).toEqual(["a", "c"]);

      expect(bucket.draw()).toBe("c");
      expect(bucket.items).toEqual(["a"]);

      expect(bucket.draw()).toBe("a");
      expect(bucket.items).toEqual([]);
    });

    it("should handle single item with any random value", () => {
      vi.spyOn(Math, "random").mockReturnValue(0.7);

      const bucket = new Bucket(["only"]);
      const drawn = bucket.draw();

      expect(drawn).toBe("only");
      expect(bucket.length).toBe(0);
    });
  });

  // ========================================
  // Tests de draw() - Edge Cases
  // ========================================

  describe("draw - edge cases", () => {
    it("should throw error when drawing from empty bucket", () => {
      const bucket = new Bucket<string>([]);

      expect(() => bucket.draw()).toThrow("The bucket is empty.");
    });

    it("should throw error when drawing after bucket is emptied", () => {
      const bucket = new Bucket(["only"]);

      bucket.draw(); // Vide le bucket

      expect(() => bucket.draw()).toThrow("The bucket is empty.");
    });

    it("should draw single item successfully", () => {
      const bucket = new Bucket(["single"]);

      const drawn = bucket.draw();

      expect(drawn).toBe("single");
      expect(bucket.length).toBe(0);
    });

    it("should handle drawing all items consecutively", () => {
      const bucket = new Bucket(["a", "b"]);

      bucket.draw();
      expect(bucket.length).toBe(1);

      bucket.draw();
      expect(bucket.length).toBe(0);

      expect(() => bucket.draw()).toThrow();
    });
  });

  // ========================================
  // Tests du Getter length
  // ========================================

  describe("length getter", () => {
    it("should return correct length for new bucket", () => {
      const bucket = new Bucket([1, 2, 3, 4, 5]);

      expect(bucket.length).toBe(5);
    });

    it("should return 0 for empty bucket", () => {
      const bucket = new Bucket([]);

      expect(bucket.length).toBe(0);
    });

    it("should update length after draw", () => {
      const bucket = new Bucket(["a", "b", "c"]);

      expect(bucket.length).toBe(3);

      bucket.draw();
      expect(bucket.length).toBe(2);

      bucket.draw();
      expect(bucket.length).toBe(1);

      bucket.draw();
      expect(bucket.length).toBe(0);
    });

    it("should maintain correct length with duplicates", () => {
      const bucket = new Bucket(["x", "x", "x", "y"]);

      expect(bucket.length).toBe(4);

      bucket.draw();
      expect(bucket.length).toBe(3);
    });
  });

  // ========================================
  // Tests du Getter items
  // ========================================

  describe("items getter", () => {
    it("should return all items", () => {
      const bucket = new Bucket(["a", "b", "c"]);

      expect(bucket.items).toEqual(["a", "b", "c"]);
    });

    it("should return empty array for empty bucket", () => {
      const bucket = new Bucket<number>([]);

      expect(bucket.items).toEqual([]);
    });

    it("should return copy, not reference to internal array", () => {
      const bucket = new Bucket(["a", "b", "c"]);

      const items = bucket.items;

      // Modifier le retour ne doit pas affecter le bucket
      (items as string[]).push("d");

      expect(bucket.length).toBe(3);
      expect(bucket.items).toEqual(["a", "b", "c"]);
    });

    it("should reflect changes after draw", () => {
      const bucket = new Bucket(["a", "b", "c"]);

      bucket.draw();

      const remaining = bucket.items;
      expect(remaining.length).toBe(2);
      expect(["a", "b", "c"]).toEqual(expect.arrayContaining([...remaining]));
    });

    it("should return new copy on each call", () => {
      const bucket = new Bucket(["a", "b"]);

      const items1 = bucket.items;
      const items2 = bucket.items;

      expect(items1).toEqual(items2);
      expect(items1).not.toBe(items2); // Différentes références
    });
  });

  // ========================================
  // Tests de Généricité (Différents Types)
  // ========================================

  describe("generic type support", () => {
    it("should work with strings", () => {
      const bucket = new Bucket<string>(["hello", "world"]);

      const drawn = bucket.draw();
      expect(typeof drawn).toBe("string");
    });

    it("should work with numbers", () => {
      const bucket = new Bucket<number>([1, 2, 3]);

      const drawn = bucket.draw();
      expect(typeof drawn).toBe("number");
    });

    it("should work with booleans", () => {
      const bucket = new Bucket<boolean>([true, false, true]);

      const drawn = bucket.draw();
      expect(typeof drawn).toBe("boolean");
    });

    it("should work with objects", () => {
      interface Item {
        id: number;
        value: string;
      }

      const items: Item[] = [
        { id: 1, value: "first" },
        { id: 2, value: "second" },
      ];

      const bucket = new Bucket<Item>(items);
      const drawn = bucket.draw();

      expect(drawn).toHaveProperty("id");
      expect(drawn).toHaveProperty("value");
      expect(items).toContainEqual(drawn);
    });

    it("should work with mixed union types", () => {
      type MixedType = string | number;

      const bucket = new Bucket<MixedType>(["text", 42, "more", 99]);

      const drawn = bucket.draw();
      expect(["text", 42, "more", 99]).toContain(drawn);
    });

    it("should work with custom class instances", () => {
      class Stimulus {
        constructor(
          public file: string,
          public duration: number,
        ) {}
      }

      const stimuli = [new Stimulus("audio1.mp3", 1.5), new Stimulus("audio2.mp3", 2.0)];

      const bucket = new Bucket<Stimulus>(stimuli);
      const drawn = bucket.draw();

      expect(drawn).toBeInstanceOf(Stimulus);
      expect(drawn.file).toBeDefined();
      expect(drawn.duration).toBeDefined();
    });
  });

  // ========================================
  // Tests d'Intégration / Scénarios Réels
  // ========================================

  describe("integration scenarios", () => {
    it("should simulate drawing audio stimuli for experiment", () => {
      const audioFiles = [
        "stimulus-001.mp3",
        "stimulus-002.mp3",
        "stimulus-003.mp3",
        "stimulus-004.mp3",
      ];

      const bucket = new Bucket(audioFiles);
      const presentedStimuli: string[] = [];

      // Tirer tous les stimuli dans un ordre aléatoire
      while (bucket.length > 0) {
        presentedStimuli.push(bucket.draw());
      }

      // Vérifier que tous les stimuli ont été présentés
      expect(presentedStimuli).toHaveLength(4);
      expect(presentedStimuli.sort()).toEqual(audioFiles.sort());

      // Le bucket est maintenant vide
      expect(bucket.length).toBe(0);
      expect(() => bucket.draw()).toThrow();
    });

    it("should simulate trial randomization", () => {
      interface Trial {
        id: number;
        condition: "high" | "low";
      }

      const trials: Trial[] = [
        { id: 1, condition: "high" },
        { id: 2, condition: "low" },
        { id: 3, condition: "high" },
        { id: 4, condition: "low" },
      ];

      const bucket = new Bucket(trials);
      const randomizedTrials: Trial[] = [];

      // Randomiser l'ordre des trials
      while (bucket.length > 0) {
        randomizedTrials.push(bucket.draw());
      }

      // Tous les trials doivent être présents
      expect(randomizedTrials).toHaveLength(4);

      // Vérifier que les IDs sont tous présents
      const ids = randomizedTrials.map((t) => t.id).sort();
      expect(ids).toEqual([1, 2, 3, 4]);
    });

    it("should handle partial draws", () => {
      const bucket = new Bucket([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

      // Tirer seulement 5 items
      const drawn: number[] = [];
      for (let i = 0; i < 5; i++) {
        drawn.push(bucket.draw());
      }

      expect(drawn).toHaveLength(5);
      expect(bucket.length).toBe(5);

      // Les 5 items tirés doivent être uniques
      const uniqueDrawn = new Set(drawn);
      expect(uniqueDrawn.size).toBe(5);
    });
  });

  // ========================================
  // Tests de Performance (Optionnels)
  // ========================================

  describe("performance", () => {
    it("should handle large buckets efficiently", () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i);
      const bucket = new Bucket(largeArray);

      const start = performance.now();

      for (let i = 0; i < 100; i++) {
        bucket.draw();
      }

      const end = performance.now();

      // Devrait prendre moins de 100ms pour 100 tirages
      expect(end - start).toBeLessThan(100);
      expect(bucket.length).toBe(900);
    });
  });

  // ========================================
  // Tests de Cas Limites Spécifiques
  // ========================================

  describe("specific edge cases", () => {
    it("should handle null items if type allows", () => {
      const bucket = new Bucket<string | null>(["a", null, "b"]);

      const items = bucket.items;
      expect(items).toContain(null);
    });

    it("should preserve order in items getter before any draws", () => {
      const ordered = ["first", "second", "third", "fourth"];
      const bucket = new Bucket(ordered);

      expect(bucket.items).toEqual(ordered);
    });
  });
});
