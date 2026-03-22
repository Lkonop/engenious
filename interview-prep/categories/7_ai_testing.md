# Category 7: Testing Generative AI Components (10 Questions)

## 1. Challenges of LLM testing.
**Answer:** **Non-determinism**. Outputs vary for the same input. We use probabilistic checks and "LLM-as-a-judge" instead of exact string matching.

## 2. Measuring LLM Accuracy.
**Answer:** Metrics like **BERTScore** (semantic similarity), **ROUGE/BLEU** (n-gram overlap), and human-in-the-loop evaluations.

## 3. What is "Prompt Injection"?
**Answer:** Attacks where users try to bypass safety guardrails (e.g., "jailbreaking"). I test this with a library of known adversarial prompts.

## 4. Scaling AI Validation.
**Answer:** I use an "Evaluator LLM" (e.g., GPT-4) to grade thousands of responses from a smaller model based on factuality and tone.

## 5. Testing RAG (Retrieval-Augmented Generation).
**Answer:** Test both the **Retrieval** (finding the right source) and the **Generation** (accurately summarizing the source without hallucinating).

## 6. What is "Hallucination" and how to test for it?
**Answer:** When an AI generates false info. I test for it by providing "ground truth" documents and verifying the AI doesn't include info NOT present in those documents.

## 7. How does "Temperature" affect testing?
**Answer:** Higher temperature = more creative/random. Lower temperature = more deterministic. I test with temperature 0.0 for consistency checks and higher values for creativity/diversity tests.

## 8. Explain "Model Drift" and how to monitor it.
**Answer:** When an LLM's performance degrades over time due to updates or data changes. I monitor it by running a "Golden Dataset" of prompts periodically and comparing metrics.

## 9. AI Cost and Token management.
**Answer:** Long prompts cost more. I test token usage to ensure the system is optimized and doesn't exceed budget or context window limits.

## 10. What is "Self-Correction" in AI and how do you test it?
**Answer:** When a model critiques its own output. I test this by giving it a complex task and checking if it can identify and fix its own errors in a second reasoning step.
