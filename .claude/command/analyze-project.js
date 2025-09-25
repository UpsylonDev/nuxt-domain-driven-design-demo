#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Analyze Project Command
 * Performs comprehensive DDD architecture analysis
 */

class ProjectAnalyzer {
  constructor() {
    this.projectRoot = process.cwd();
    this.strengths = [];
    this.weaknesses = [];
    this.improvements = [];
    this.score = 0;
    this.maxScore = 100;
  }

  async analyze() {
    console.log('🔍 Analyzing DDD Nuxt Project Architecture...\n');

    await this.analyzeDomainStructure();
    await this.analyzeDDDPatterns();
    await this.analyzeCodeQuality();
    await this.analyzeTestingStrategy();
    await this.analyzeDocumentation();
    await this.analyzeConfiguration();

    this.generateReport();
  }

  async analyzeDomainStructure() {
    console.log('📁 Analyzing Domain Structure...');

    const domainsPath = path.join(this.projectRoot, 'domains');
    if (!fs.existsSync(domainsPath)) {
      this.weaknesses.push('Missing domains directory - core DDD structure not implemented');
      return;
    }

    const domains = fs.readdirSync(domainsPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    if (domains.length === 0) {
      this.weaknesses.push('No domains found - DDD architecture not implemented');
      return;
    }

    this.strengths.push(`${domains.length} domain(s) identified: ${domains.join(', ')}`);
    this.score += 10;

    // Analyze each domain structure
    for (const domain of domains) {
      await this.analyzeDomainLayer(domain);
    }
  }

  async analyzeDomainLayer(domain) {
    const domainPath = path.join(this.projectRoot, 'domains', domain);
    const requiredStructure = [
      'components', 'composables', 'pages', 'server',
      'tests', 'types.ts', 'utils', 'nuxt.config.ts'
    ];

    let structureScore = 0;
    const missingItems = [];

    for (const item of requiredStructure) {
      const itemPath = path.join(domainPath, item);
      if (fs.existsSync(itemPath)) {
        structureScore++;
      } else {
        missingItems.push(item);
      }
    }

    if (structureScore === requiredStructure.length) {
      this.strengths.push(`${domain} domain: Complete DDD structure implemented`);
      this.score += 5;
    } else {
      this.weaknesses.push(`${domain} domain: Missing ${missingItems.join(', ')}`);
      this.improvements.push(`Add missing structure to ${domain}: ${missingItems.join(', ')}`);
    }

    // Analyze domain-specific patterns
    await this.analyzeDomainPatterns(domain);
  }

  async analyzeDomainPatterns(domain) {
    const domainPath = path.join(this.projectRoot, 'domains', domain);

    // Check for Entity/Value Object definitions
    const typesPath = path.join(domainPath, 'types.ts');
    if (fs.existsSync(typesPath)) {
      const typesContent = fs.readFileSync(typesPath, 'utf8');

      if (typesContent.includes('interface') || typesContent.includes('type')) {
        this.strengths.push(`${domain}: Domain types defined`);
        this.score += 2;
      }

      if (typesContent.includes('Entity') || typesContent.includes('ValueObject')) {
        this.strengths.push(`${domain}: DDD tactical patterns (Entity/ValueObject) implemented`);
        this.score += 3;
      } else {
        this.improvements.push(`${domain}: Consider implementing explicit Entity and ValueObject patterns`);
      }
    }

    // Check for Application Services (composables)
    const composablesPath = path.join(domainPath, 'composables');
    if (fs.existsSync(composablesPath)) {
      const composables = fs.readdirSync(composablesPath).filter(f => f.endsWith('.ts'));
      if (composables.length > 0) {
        this.strengths.push(`${domain}: ${composables.length} application service(s) implemented`);
        this.score += 3;
      }
    } else {
      this.weaknesses.push(`${domain}: No application services (composables) found`);
    }

    // Check for Domain Services (utils)
    const utilsPath = path.join(domainPath, 'utils');
    if (fs.existsSync(utilsPath)) {
      const utils = fs.readdirSync(utilsPath).filter(f => f.endsWith('.ts'));
      if (utils.length > 0) {
        this.strengths.push(`${domain}: Domain services implemented`);
        this.score += 2;
      }
    }
  }

  async analyzeDDDPatterns() {
    console.log('🎯 Analyzing DDD Pattern Implementation...');

    // Check for Repository pattern
    const hasRepositoryPattern = await this.checkPattern('repository', ['server/api']);
    if (hasRepositoryPattern) {
      this.strengths.push('Repository pattern implemented via API layer');
      this.score += 5;
    } else {
      this.improvements.push('Implement explicit Repository pattern for data access abstraction');
    }

    // Check for Domain Events
    const hasDomainEvents = await this.checkPattern('event', ['composables', 'utils']);
    if (!hasDomainEvents) {
      this.improvements.push('Consider implementing Domain Events for cross-domain communication');
    }

    // Check for Aggregates
    const hasAggregates = await this.checkPattern('aggregate', ['types.ts', 'utils']);
    if (!hasAggregates) {
      this.improvements.push('Consider implementing Aggregate pattern for complex domain entities');
    }

    // Check for Specifications
    const hasSpecifications = await this.checkPattern('spec', ['utils', 'types.ts']);
    if (!hasSpecifications) {
      this.improvements.push('Consider implementing Specification pattern for complex business rules');
    }
  }

  async analyzeCodeQuality() {
    console.log('💎 Analyzing Code Quality...');

    // Check for ESLint configuration
    const eslintConfig = ['.eslintrc.js', '.eslintrc.json', 'eslint.config.js'].some(
      config => fs.existsSync(path.join(this.projectRoot, config))
    );

    if (eslintConfig) {
      this.strengths.push('ESLint configuration present');
      this.score += 3;
    } else {
      this.weaknesses.push('No ESLint configuration found');
      this.improvements.push('Add ESLint with TypeScript and Vue rules');
    }

    // Check for Prettier configuration
    const prettierConfig = ['.prettierrc', '.prettierrc.json', 'prettier.config.js'].some(
      config => fs.existsSync(path.join(this.projectRoot, config))
    );

    if (prettierConfig) {
      this.strengths.push('Code formatting (Prettier) configured');
      this.score += 2;
    } else {
      this.improvements.push('Add Prettier for consistent code formatting');
    }

    // Check for TypeScript strict mode
    const tsConfig = path.join(this.projectRoot, 'tsconfig.json');
    if (fs.existsSync(tsConfig)) {
      const tsContent = JSON.parse(fs.readFileSync(tsConfig, 'utf8'));
      if (tsContent.compilerOptions?.strict) {
        this.strengths.push('TypeScript strict mode enabled');
        this.score += 3;
      } else {
        this.improvements.push('Enable TypeScript strict mode for better type safety');
      }
    }

    // Check for Husky/Git hooks
    const huskyPath = path.join(this.projectRoot, '.husky');
    if (fs.existsSync(huskyPath)) {
      this.strengths.push('Git hooks (Husky) configured');
      this.score += 2;
    } else {
      this.improvements.push('Add pre-commit hooks with Husky for code quality enforcement');
    }
  }

  async analyzeTestingStrategy() {
    console.log('🧪 Analyzing Testing Strategy...');

    // Check for unit tests
    const hasVitest = fs.existsSync(path.join(this.projectRoot, 'vitest.config.ts'));
    if (hasVitest) {
      this.strengths.push('Vitest unit testing configured');
      this.score += 5;
    }

    // Check for E2E tests
    const hasPlaywright = fs.existsSync(path.join(this.projectRoot, 'playwright.config.ts'));
    if (hasPlaywright) {
      this.strengths.push('Playwright E2E testing configured');
      this.score += 5;
    }

    // Count test files
    let testCount = 0;
    const domainsPath = path.join(this.projectRoot, 'domains');
    if (fs.existsSync(domainsPath)) {
      const domains = fs.readdirSync(domainsPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory());

      for (const domain of domains) {
        const testsPath = path.join(domainsPath, domain.name, 'tests');
        if (fs.existsSync(testsPath)) {
          const testFiles = this.getTestFiles(testsPath);
          testCount += testFiles.length;
        }
      }
    }

    if (testCount > 0) {
      this.strengths.push(`${testCount} test files found`);
      this.score += Math.min(testCount * 2, 10);
    } else {
      this.weaknesses.push('No test files found in domain layers');
      this.improvements.push('Add comprehensive unit tests for domain logic');
    }

    // Check for test coverage configuration
    const packageJson = path.join(this.projectRoot, 'package.json');
    if (fs.existsSync(packageJson)) {
      const pkg = JSON.parse(fs.readFileSync(packageJson, 'utf8'));
      if (pkg.scripts?.['test:coverage']) {
        this.strengths.push('Test coverage reporting configured');
        this.score += 3;
      } else {
        this.improvements.push('Add test coverage reporting and thresholds');
      }
    }
  }

  async analyzeDocumentation() {
    console.log('📚 Analyzing Documentation Quality...');

    // Check for README
    const readme = fs.existsSync(path.join(this.projectRoot, 'README.md'));
    if (readme) {
      this.strengths.push('README.md present');
      this.score += 2;
    } else {
      this.weaknesses.push('Missing README.md');
    }

    // Check for CLAUDE.md (domain knowledge)
    const claudemd = fs.existsSync(path.join(this.projectRoot, 'CLAUDE.md'));
    if (claudemd) {
      this.strengths.push('CLAUDE.md with project context present');
      this.score += 3;
    }

    // Check for API documentation
    const hasApiDocs = await this.checkForApiDocumentation();
    if (!hasApiDocs) {
      this.improvements.push('Add API documentation (OpenAPI/Swagger)');
    }

    // Check for architecture diagrams
    const hasArchDiagrams = ['docs', 'architecture', '.github'].some(dir =>
      fs.existsSync(path.join(this.projectRoot, dir))
    );

    if (!hasArchDiagrams) {
      this.improvements.push('Add architecture diagrams and documentation');
    }
  }

  async analyzeConfiguration() {
    console.log('⚙️  Analyzing Configuration...');

    // Check for environment configuration
    const hasEnvConfig = ['.env.example', '.env.local', 'nuxt.config.ts'].some(
      config => fs.existsSync(path.join(this.projectRoot, config))
    );

    if (hasEnvConfig) {
      this.strengths.push('Environment configuration present');
      this.score += 2;
    }

    // Check for Docker configuration
    const hasDocker = ['Dockerfile', 'docker-compose.yml'].some(
      config => fs.existsSync(path.join(this.projectRoot, config))
    );

    if (hasDocker) {
      this.strengths.push('Docker configuration present');
      this.score += 3;
    } else {
      this.improvements.push('Add Docker configuration for containerized deployment');
    }

    // Check for CI/CD configuration
    const hasCI = ['.github/workflows', '.gitlab-ci.yml', 'azure-pipelines.yml'].some(
      config => fs.existsSync(path.join(this.projectRoot, config))
    );

    if (hasCI) {
      this.strengths.push('CI/CD pipeline configured');
      this.score += 5;
    } else {
      this.improvements.push('Add CI/CD pipeline for automated testing and deployment');
    }
  }

  // Helper methods
  async checkPattern(pattern, locations) {
    const domainsPath = path.join(this.projectRoot, 'domains');
    if (!fs.existsSync(domainsPath)) return false;

    const domains = fs.readdirSync(domainsPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory());

    for (const domain of domains) {
      for (const location of locations) {
        const searchPath = path.join(domainsPath, domain.name, location);
        if (await this.searchInDirectory(searchPath, pattern)) {
          return true;
        }
      }
    }
    return false;
  }

  async searchInDirectory(dirPath, pattern) {
    if (!fs.existsSync(dirPath)) return false;

    try {
      const files = fs.readdirSync(dirPath, { withFileTypes: true });

      for (const file of files) {
        if (file.isFile() && file.name.endsWith('.ts')) {
          const filePath = path.join(dirPath, file.name);
          const content = fs.readFileSync(filePath, 'utf8');
          if (content.toLowerCase().includes(pattern.toLowerCase())) {
            return true;
          }
        } else if (file.isDirectory()) {
          const found = await this.searchInDirectory(
            path.join(dirPath, file.name),
            pattern
          );
          if (found) return true;
        }
      }
    } catch (error) {
      // Ignore permission errors
    }

    return false;
  }

  getTestFiles(dir) {
    if (!fs.existsSync(dir)) return [];

    const files = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      if (item.isFile() && (item.name.endsWith('.test.ts') || item.name.endsWith('.spec.ts'))) {
        files.push(item.name);
      } else if (item.isDirectory()) {
        files.push(...this.getTestFiles(path.join(dir, item.name)));
      }
    }

    return files;
  }

  async checkForApiDocumentation() {
    const docsPatterns = ['swagger', 'openapi', 'api-docs', 'docs/api'];
    return docsPatterns.some(pattern =>
      fs.existsSync(path.join(this.projectRoot, pattern))
    );
  }

  generateReport() {
    const percentage = Math.round((this.score / this.maxScore) * 100);

    console.log('\n' + '='.repeat(60));
    console.log('📊 DDD NUXT PROJECT ANALYSIS REPORT');
    console.log('='.repeat(60));

    console.log(`\n🎯 Overall Score: ${this.score}/${this.maxScore} (${percentage}%)`);

    this.printGrade(percentage);

    console.log(`\n✅ STRENGTHS (${this.strengths.length}):`);
    this.strengths.forEach((strength, i) => {
      console.log(`   ${i + 1}. ${strength}`);
    });

    console.log(`\n❌ WEAKNESSES (${this.weaknesses.length}):`);
    this.weaknesses.forEach((weakness, i) => {
      console.log(`   ${i + 1}. ${weakness}`);
    });

    console.log(`\n🚀 IMPROVEMENT OPPORTUNITIES (${this.improvements.length}):`);
    this.improvements.forEach((improvement, i) => {
      console.log(`   ${i + 1}. ${improvement}`);
    });

    console.log('\n' + '='.repeat(60));
    console.log('💡 RECOMMENDATIONS FOR EXCEPTIONAL PROJECT');
    console.log('='.repeat(60));

    this.generateRecommendations(percentage);
  }

  printGrade(percentage) {
    let grade, emoji, description;

    if (percentage >= 90) {
      grade = 'A+'; emoji = '🏆'; description = 'Exceptional - Production Ready';
    } else if (percentage >= 80) {
      grade = 'A'; emoji = '⭐'; description = 'Excellent - Minor improvements needed';
    } else if (percentage >= 70) {
      grade = 'B'; emoji = '👍'; description = 'Good - Some enhancements required';
    } else if (percentage >= 60) {
      grade = 'C'; emoji = '⚠️'; description = 'Average - Significant improvements needed';
    } else {
      grade = 'D'; emoji = '🔧'; description = 'Needs Work - Major restructuring required';
    }

    console.log(`\n${emoji} Grade: ${grade} - ${description}`);
  }

  generateRecommendations(percentage) {
    if (percentage < 60) {
      console.log('\n🔧 CRITICAL PRIORITIES:');
      console.log('   1. Implement missing domain structure');
      console.log('   2. Add comprehensive testing strategy');
      console.log('   3. Establish code quality tools');
      console.log('   4. Create proper documentation');
    } else if (percentage < 80) {
      console.log('\n📈 ENHANCEMENT PRIORITIES:');
      console.log('   1. Complete DDD tactical patterns implementation');
      console.log('   2. Improve test coverage and quality');
      console.log('   3. Add advanced tooling and automation');
      console.log('   4. Enhance documentation and diagrams');
    } else {
      console.log('\n🚀 EXCELLENCE PRIORITIES:');
      console.log('   1. Implement advanced DDD patterns (Events, Specifications)');
      console.log('   2. Add performance monitoring and optimization');
      console.log('   3. Create comprehensive architecture documentation');
      console.log('   4. Implement advanced deployment strategies');
    }

    console.log('\n🎯 NEXT STEPS:');
    console.log('   1. Address top 3 weaknesses first');
    console.log('   2. Implement improvements in order of impact');
    console.log('   3. Re-run analysis after each major improvement');
    console.log('   4. Aim for 90+ score for production readiness');

    console.log('\n📚 RESOURCES:');
    console.log('   • Domain-Driven Design by Eric Evans');
    console.log('   • Clean Architecture by Robert Martin');
    console.log('   • Nuxt 3 Layer Documentation');
    console.log('   • Testing Vue.js Applications');

    console.log('\n✨ Ready to build an exceptional DDD project!');
  }
}

// Run analysis
const analyzer = new ProjectAnalyzer();
analyzer.analyze().catch(console.error);