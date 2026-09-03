#!/usr/bin/env tsx
/**
 * Build Validation Script for MUCO Labs
 * Validates the build process and checks for common issues
 */

import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

interface ValidationResult {
  success: boolean;
  checks: {
    name: string;
    status: 'pass' | 'fail' | 'warn';
    message: string;
  }[];
}

const validationResults: ValidationResult['checks'] = [];

function addCheck(name: string, status: 'pass' | 'fail' | 'warn', message: string) {
  validationResults.push({ name, status, message });
  console.log(`[${status.toUpperCase()}] ${name}: ${message}`);
}

function validateEnvironment() {
  const envFile = '.env';
  const envExample = '.env.example';
  
  if (!existsSync(envFile) && existsSync(envExample)) {
    addCheck('Environment File', 'warn', '.env file not found, using .env.example as reference');
  } else if (existsSync(envFile)) {
    addCheck('Environment File', 'pass', '.env file exists');
  } else {
    addCheck('Environment File', 'fail', 'Neither .env nor .env.example found');
  }
}

function validateDependencies() {
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
    const requiredDeps = ['react', 'react-dom', 'vite', 'typescript'];
    
    for (const dep of requiredDeps) {
      if (packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]) {
        addCheck(`Dependency: ${dep}`, 'pass', 'Found in package.json');
      } else {
        addCheck(`Dependency: ${dep}`, 'fail', 'Missing from package.json');
      }
    }
  } catch (error) {
    addCheck('Dependencies', 'fail', 'Failed to parse package.json');
  }
}

function validateTypeScript() {
  try {
    execSync('npm run lint', { stdio: 'pipe' });
    addCheck('TypeScript', 'pass', 'No TypeScript errors found');
  } catch (error) {
    addCheck('TypeScript', 'fail', 'TypeScript compilation failed');
  }
}

function validateCriticalFiles() {
  const criticalFiles = [
    'src/main.tsx',
    'src/App.tsx',
    'index.html',
    'vite.config.ts',
    'tsconfig.json',
    'package.json'
  ];
  
  for (const file of criticalFiles) {
    if (existsSync(file)) {
      addCheck(`Critical File: ${file}`, 'pass', 'File exists');
    } else {
      addCheck(`Critical File: ${file}`, 'fail', 'File missing');
    }
  }
}

function validateBuildSize() {
  try {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));
    const dependencies = Object.keys(packageJson.dependencies || {}).length;
    const devDependencies = Object.keys(packageJson.devDependencies || {}).length;
    
    if (dependencies > 50) {
      addCheck('Bundle Size', 'warn', `High dependency count: ${dependencies} production dependencies`);
    } else {
      addCheck('Bundle Size', 'pass', `Reasonable dependency count: ${dependencies} production dependencies`);
    }
    
    if (devDependencies > 30) {
      addCheck('Dev Dependencies', 'warn', `High dev dependency count: ${devDependencies}`);
    } else {
      addCheck('Dev Dependencies', 'pass', `Reasonable dev dependency count: ${devDependencies}`);
    }
  } catch (error) {
    addCheck('Bundle Size', 'fail', 'Failed to analyze dependencies');
  }
}

function validateGitIgnore() {
  if (existsSync('.gitignore')) {
    const gitignore = readFileSync('.gitignore', 'utf-8');
    const criticalEntries = ['.env', 'node_modules', 'dist', '.DS_Store'];
    
    let missingEntries = 0;
    for (const entry of criticalEntries) {
      if (!gitignore.includes(entry)) {
        missingEntries++;
      }
    }
    
    if (missingEntries === 0) {
      addCheck('.gitignore', 'pass', 'Contains all critical entries');
    } else {
      addCheck('.gitignore', 'warn', `Missing ${missingEntries} critical entries`);
    }
  } else {
    addCheck('.gitignore', 'fail', '.gitignore file not found');
  }
}

function validateFirebaseConfig() {
  if (existsSync('firebase-applet-config.json')) {
    try {
      const firebaseConfig = JSON.parse(readFileSync('firebase-applet-config.json', 'utf-8'));
      const requiredFields = ['projectId', 'appId', 'apiKey'];
      
      let missingFields = 0;
      for (const field of requiredFields) {
        if (!firebaseConfig[field]) {
          missingFields++;
        }
      }
      
      if (missingFields === 0) {
        addCheck('Firebase Config', 'pass', 'All required fields present');
      } else {
        addCheck('Firebase Config', 'warn', `Missing ${missingFields} required fields`);
      }
    } catch (error) {
      addCheck('Firebase Config', 'fail', 'Failed to parse Firebase config');
    }
  } else {
    addCheck('Firebase Config', 'warn', 'Firebase config file not found');
  }
}

function runValidation() {
  console.log('🔍 Starting Build Validation...\n');
  
  validateEnvironment();
  validateDependencies();
  validateCriticalFiles();
  validateGitIgnore();
  validateFirebaseConfig();
  validateBuildSize();
  
  // TypeScript validation is optional since it might fail during development
  try {
    validateTypeScript();
  } catch (error) {
    // TypeScript check failed, but we continue with other validations
  }
  
  const result: ValidationResult = {
    success: validationResults.every(check => check.status !== 'fail'),
    checks: validationResults
  };
  
  console.log('\n📊 Validation Summary:');
  console.log(`Total checks: ${validationResults.length}`);
  console.log(`Passed: ${validationResults.filter(c => c.status === 'pass').length}`);
  console.log(`Warnings: ${validationResults.filter(c => c.status === 'warn').length}`);
  console.log(`Failed: ${validationResults.filter(c => c.status === 'fail').length}`);
  
  if (result.success) {
    console.log('\n✅ Build validation passed!');
    process.exit(0);
  } else {
    console.log('\n❌ Build validation failed!');
    process.exit(1);
  }
}

runValidation();