# Architecture Domain-Driven Design (DDD)

Ce projet implémente maintenant une architecture DDD complète avec une séparation claire des responsabilités dans chaque domaine.

## Structure DDD par Domaine

### `/domains/{domain}/`

Chaque domaine suit maintenant la structure DDD correcte :

```
domains/users/
├── services/           # 🏢 Couche Service (Domain Services)
│   └── UserService.ts  # Logic métier et communications serveur
├── composables/        # 🔄 Couche Application (Application Services)
│   └── useUsers.ts     # Orchestration des cas d'usage + état réactif
├── components/         # 🎨 Couche UI (Presentation Layer)
│   └── UserProfile.vue # Composants Vue spécifiques au domaine
├── pages/             # 🌐 Couche Interface (Interface Layer)
│   └── users/         # Routes et points d'entrée
├── server/api/        # 🔌 Couche Infrastructure
│   └── users.get.ts   # APIs et accès aux données
├── tests/             # 🧪 Tests du domaine
├── types.ts           # 📝 Modèle de domaine (Entities, Value Objects)
└── utils/             # 🛠️ Services de domaine purs
```

## Principes DDD Implémentés

### 1. **Service Layer (services/)**
- **Responsabilité** : Logique métier et communications avec les APIs
- **Exemple** : `UserService.fetchUsers()`, `PostService.validatePost()`
- **Principe DDD** : Domain Services - encapsule la logique métier complexe

### 2. **Application Layer (composables/)**
- **Responsabilité** : Orchestration des cas d'usage et gestion de l'état réactif
- **Exemple** : `useUsers()` utilise `UserService` et gère loading/error states
- **Principe DDD** : Application Services - coordonne les opérations du domaine

### 3. **Presentation Layer (components/)**
- **Responsabilité** : Interface utilisateur spécifique au domaine
- **Exemple** : `UserProfile.vue`, `PostCard.vue`
- **Principe DDD** : UI Layer - présentation des données du domaine

### 4. **Infrastructure Layer (server/api/)**
- **Responsabilité** : Accès aux données externes (APIs, bases de données)
- **Exemple** : Endpoints API qui utilisent faker.js
- **Principe DDD** : Infrastructure - abstraction des détails techniques

## Flux de Données DDD

```
UI Component (Vue)
       ↓
Application Service (Composable)
       ↓
Domain Service (Service Class)
       ↓
Infrastructure (API Endpoint)
       ↓
External Data Source (faker.js)
```

## Avantages de cette Architecture

### ✅ **Séparation des Préoccupations**
- Chaque couche a une responsabilité claire et définie
- La logique métier est isolée dans les Services
- L'état réactif est géré dans les Composables

### ✅ **Testabilité**
- Services purs facilement testables
- Mocking simplifié grâce aux couches séparées
- Tests unitaires par couche possible

### ✅ **Maintenabilité**
- Logique métier centralisée dans les Services
- Changements d'API isolés dans la couche Infrastructure
- Évolution indépendante de chaque domaine

### ✅ **Réutilisabilité**
- Services réutilisables entre différents composables
- Logique métier partageable
- Composants focalisés sur la présentation

## Migration Effectuée

### Avant (Anti-pattern)
```typescript
// ❌ Composable avec appel API direct
export const useUsers = () => {
  const users = useState("users", (): User[] => []);

  async function fetch() {
    const { data, error } = await useFetch("/api/users");
    // Logique directe dans le composable
  }
}
```

### Après (DDD Pattern)
```typescript
// ✅ Service Layer
export class UserService {
  static async fetchUsers(): Promise<User[]> {
    // Logique métier centralisée
  }
}

// ✅ Application Layer
export const useUsers = () => {
  async function fetch() {
    const fetchedUsers = await UserService.fetchUsers();
    // Orchestration + gestion d'état
  }
}
```

## Bounded Contexts

- **Users Domain** : Gestion des utilisateurs, authentification, profils
- **Posts Domain** : Gestion du contenu, publication, cycle de vie des articles

Chaque domaine reste indépendant avec ses propres Services, tout en permettant des interactions contrôlées via les types TypeScript partagés.