# Architecture & Design Notes

This document captures key architecture decisions, and challenges faced, for the **Payment Transfer Module (React Native + Expo)**.


##  Design Decisions

### ADR-001: Feature-Based Grouping
- **Decision**: All domain logic is grouped under `features/transfer`, including `/api`, `/components`, `/constants`, `/hooks`, `/schema`, `/stores`. Screens are colocated as files inside this feature.
- **Rationale**: Enables feature-based modularization. Teams can work within one feature without knowing other domains. Easier to version (v1, v2) and maintain loose coupling.

### ADR-002: State & Server Data Handling
- **Decision:** Use React Query with custom hooks for server-side data; Minimal client-side state with Zustand and SearchParams, hence no global state libraries like Redux.
- **Rationale:** Keeps data concerns separate. Lightweight and avoids Redux complexity.

### ADR-003: Form Validation
- **Decision:** Use `zod` with `react-hook-form`.
- **Rationale:** Strong schema validation with minimal boilerplate, and enhances developer experience.

### ADR-004: Mock API with Simulated Faults
- **Decision:** Implement mock API with delays and error codes (e.g., insufficient funds, network).
- **Rationale:** Simulates real-world scenarios (loading, retries, errors). Easy to swap with real backend.

### ADR-005: Use of Expo for Boilerplate
- **Decision**: Started with Expo for quick scaffolding, asset pipeline, and easy reviewer access via QR code.
- **Rationale**: Faster setup and simpler distribution for evaluation. However, Expo introduces some constraints (native customization, build size) and may not be ideal for long-term production without ejecting.


##  Challenges Faced
- Biometric flows couldn’t be tested on simulators, required deployment to a physical device.
- Debugging React Native errors involved both JavaScript logs and native (Xcode) consoles.
- Without an Apple Developer account, distribution was done via Expo Go and QR codes.
- Customizing assets (app icons, splash screens) was tricky due to cache and build quirks.
- Did not test on Web and Android due to time/device constraints.
