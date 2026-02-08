# Naming Conventions

This document defines naming conventions for the pitch experiment project to ensure consistency and maintainability.d

## General Principles

- **Be descriptive**: Names should clearly communicate purpose
- **Be consistent**: Follow the same patterns throughout the codebase
- **Avoid abbreviations**: Use full words unless the abbreviation is universally understood (e.g., `id`, `url`, `api`)
- **Use English**: All code and comments in English

---

## Files and Folders

### Directories

- **lowercase-kebab-case** for all folder names
- Use plural nouns for collections: `components/`, `routes/`, `services/`
- Use singular nouns for single-purpose folders: `lib/`, `utils/`
```
✅ src/components/ui/
✅ src/experiment/
✅ apps/backend/
❌ src/Components/
❌ src/Experiment_Logic/
```

### Files

**React Components**: `PascalCase.tsx`
```
✅ CodeEntry.tsx
✅ ExperimentContainer.tsx
❌ codeEntry.tsx
❌ experiment-container.tsx
```

**TypeScript/JavaScript files**: `camelCase.ts` or `kebab-case.ts`
```
✅ api.ts
✅ participantService.ts
✅ create-timeline.ts
❌ ParticipantService.ts
```

**Configuration files**: `lowercase` with standard extensions
```
✅ tsconfig.json
✅ vite.config.ts
✅ tailwind.config.js
```

**Documentation**: `UPPERCASE.md` for root-level docs, `lowercase.md` for nested docs
```
✅ README.md
✅ NAMING.md
✅ docs/api-endpoints.md
```

---

## Code Conventions

### Variables and Constants

**Variables**: `camelCase`
```typescript
✅ const participantCode = 'ABC123';
✅ let responseTime = 450;
❌ const participant_code = 'ABC123';
```

**Constants**: `SCREAMING_SNAKE_CASE` for true constants
```typescript
✅ const API_BASE_URL = 'http://localhost:3000';
✅ const MAX_RESPONSE_TIME = 5000;
❌ const apiBaseUrl = 'http://localhost:3000';
```

**Boolean variables**: Prefix with `is`, `has`, `should`, `can`
```typescript
✅ const isValid = true;
✅ const hasCompletedExperiment = false;
✅ const shouldPreloadAudio = true;
❌ const valid = true;
```

### Functions

**Functions**: `camelCase`, use verb prefix
```typescript
✅ function validateParticipantCode(code: string): boolean
✅ function createTimeline(): Timeline
✅ async function submitExperimentData(data: ExperimentData): Promise<void>
❌ function participant_validation(code: string)
❌ function timeline()
```

**Event handlers**: Prefix with `handle` or `on`
```typescript
✅ function handleCodeSubmit()
✅ function onExperimentComplete()
❌ function codeSubmit()
```

**Async functions**: Make it clear they're async (context-dependent)
```typescript
✅ async function fetchParticipant(code: string)
✅ async function submitData(data: ExperimentData)
```

### React Components

**Component names**: `PascalCase`, descriptive noun
```typescript
✅ function CodeEntry()
✅ function ExperimentContainer()
❌ function codeEntry()
❌ function Experiment()  // Too vague
```

**Props interfaces**: Component name + `Props`
```typescript
✅ interface CodeEntryProps {
  onCodeSubmit: (code: string) => void;
}

✅ function CodeEntry({ onCodeSubmit }: CodeEntryProps)
```

**Custom hooks**: Prefix with `use`
```typescript
✅ function useExperiment()
✅ function useParticipantValidation()
❌ function experimentHook()
```

### Types and Interfaces

**Interfaces**: `PascalCase`, descriptive noun
```typescript
✅ interface Participant
✅ interface ExperimentData
✅ interface ApiResponse<T>
❌ interface IParticipant  // No "I" prefix
```

**Type aliases**: `PascalCase`
```typescript
✅ type TrialType = 'practice' | 'experimental';
✅ type ScreenName = 'code-entry' | 'instructions' | 'experiment';
```

**Enums**: `PascalCase` for enum name, `PascalCase` for values
```typescript
✅ enum ExperimentPhase {
  CodeEntry = 'code-entry',
  Instructions = 'instructions',
  Experiment = 'experiment',
  Complete = 'complete',
}
```

**Generic type parameters**: Single uppercase letter or descriptive `PascalCase`
```typescript
✅ function wrap<T>(value: T): T
✅ function transform<TInput, TOutput>(input: TInput): TOutput
❌ function wrap<type>(value: type)
```

---

## Database Conventions

### Table Names
- **lowercase_snake_case**
- Plural nouns for tables
```sql
✅ participants
✅ experiments
✅ trial_responses
❌ Participant
❌ experiment
```

### Column Names
- **lowercase_snake_case**
- Use descriptive names
```sql
✅ participant_code
✅ created_at
✅ trials_data
❌ participantCode
❌ createdAt
```

### Primary Keys
```sql
✅ id  -- Simple integer ID
```

### Foreign Keys
```sql
✅ participant_id  -- References participants.id
✅ participant_code  -- References participants.code
```

### Timestamps
```sql
✅ created_at
✅ updated_at
✅ completed_at
❌ createdDate
❌ timestamp
```

---

## API Conventions

### Route Paths
- **lowercase-kebab-case**
- Use plural nouns for collections
- RESTful conventions
```
✅ GET  /api/participants/:code
✅ POST /api/experiments
✅ GET  /api/experiment-results/:id
❌ GET  /api/getParticipant/:code
❌ POST /api/submitExperiment
```

### Request/Response Keys
- **camelCase** in JSON
```json
✅ { "participantCode": "ABC123", "trialsData": [...] }
❌ { "participant_code": "ABC123", "trials_data": [...] }
```

---

## CSS/Tailwind Conventions

### Custom CSS Classes
- **lowercase-kebab-case**
```css
✅ .experiment-container
✅ .audio-player-controls
❌ .experimentContainer
```

### Tailwind Classes
- Use Tailwind's utility-first approach
- Group related utilities
```tsx
✅ <div className="flex items-center justify-center min-h-screen bg-gray-50">
✅ <button className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
```

---

## Git Conventions

### Branch Names
- **lowercase-kebab-case**
- Prefix with type: `feature/`, `fix/`, `docs/`, `refactor/`
```
✅ feature/add-audio-playback
✅ fix/response-time-calculation
✅ docs/update-readme
❌ Feature/AudioPlayback
❌ fix_response_time
```

### Commit Messages
- Use imperative mood ("Add feature" not "Added feature")
- Capitalize first letter
- No period at the end
- Keep first line under 50 characters
```
✅ Add participant code validation
✅ Fix audio preloading bug
✅ Update experiment instructions
❌ added participant code validation
❌ Fixed bug.
```

---

## Audio Files

### Stimulus Files
- **lowercase-kebab-case** or numeric IDs
- Include stimulus metadata in filename if helpful
```
✅ stimulus-001.mp3
✅ high-pitch-a4.mp3
✅ practice-trial-01.mp3
❌ Stimulus_1.mp3
❌ HIGHPITCH.mp3
```

---

## Environment Variables

- **SCREAMING_SNAKE_CASE**
- Prefix with `VITE_` for frontend (Vite requirement)
```bash
✅ VITE_API_URL=http://localhost:3000
✅ PORT=3000
✅ DATABASE_PATH=./data/experiment.db
❌ apiUrl=http://localhost:3000
```

---

## Examples

### Good Example
```typescript
// src/services/participantService.ts

import { queries } from '../db/queries.js';
import type { Participant } from '@task-experiment/types';

const MAX_CODE_LENGTH = 20;

export function validateParticipantCode(code: string): boolean {
  if (!code || code.length > MAX_CODE_LENGTH) {
    return false;
  }
  
  const participant = queries.findParticipantByCode.get(code);
  return !!participant;
}

export function createParticipant(code: string): Participant {
  const result = queries.createParticipant.run(code);
  return {
    id: result.lastInsertRowid as number,
    code,
    createdAt: new Date(),
  };
}
```

### Bad Example
```typescript
// src/services/participant_service.ts

import { queries } from '../db/queries.js';

const max_code_len = 20;  // ❌ Should be MAX_CODE_LENGTH

export function validate(c: string): boolean {  // ❌ Not descriptive
  if (!c || c.length > max_code_len) {
    return false;
  }
  
  const p = queries.findParticipantByCode.get(c);  // ❌ Single letter variable
  return !!p;
}

export function CreateParticipant(code: string) {  // ❌ Should be camelCase
  // ...
}
```

---

## When to Deviate

These are guidelines, not absolute rules. Deviate when:

1. **External libraries require it**: Some libraries expect specific naming (e.g., jsPsych conventions)
2. **Established conventions**: SQL keywords, HTTP methods, etc.
3. **Common acronyms**: `id`, `url`, `api`, `html` are acceptable in lowercase
4. **Better clarity**: If a different convention makes code more readable

Document deviations in code comments when they might be confusing.