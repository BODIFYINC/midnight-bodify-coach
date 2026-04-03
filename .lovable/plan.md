## Phase 1: Database — Store All User Data
1. **Migration**: Create tables for `user_settings` (age, weight, height, activity level, goals), `workout_logs`, `meal_logs`, `chat_messages` — all with RLS
2. **Save onboarding data** to `user_settings` instead of just localStorage
3. **Persist chat history** so conversations resume across sessions

## Phase 2: UI/UX — Premium Polish Across All Screens
4. **Login/Signup**: Better visual distinction, animated transitions, polished form states
5. **Onboarding**: Smoother step transitions, better card styling, progress indicator
6. **Dashboard/Home**: Refined card hierarchy, better spacing, consistent turquoise palette
7. **AI Chat**: iMessage-style bubbles, typing indicator, smooth scroll, message timestamps
8. **Bottom Nav**: Polish active states and transitions
9. **Workout/Meals tabs**: Better card designs, loading skeletons

## Phase 3: Backend Integration
10. **Wire up** workout logging, meal tracking, and daily logs to the database
11. **Sync preferences** between localStorage and database for offline support
12. **Chat edge function** already works — add message persistence layer

All changes will strictly use the existing turquoise brand palette.