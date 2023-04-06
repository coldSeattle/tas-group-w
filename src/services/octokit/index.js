import { Octokit } from '@octokit/core';

// представим что это 12 факторное приложение и я не поленился использовать переменные окружения
const octokitInstance = new Octokit({
  auth: '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',
});

export default octokitInstance;
