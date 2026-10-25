# TechSkillHub resource-verification export

The portable review bundle is committed as [techskillhub-resource-verification.zip](./techskillhub-resource-verification.zip). It contains the resource inventory, mapped curriculum material, source evidence, integrity manifest and reviewer packets. Its SHA-256 is in the adjacent .sha256 file; the .verification.json record documents a ZIP readability and content check.

The expanded generated folder is deliberately excluded from the public application tree to avoid keeping two copies of the same large research data. To regenerate it from the current repository sources, run:

```bash
node artifacts/resource-verification-package/tools/generate.mjs
```

The exporter reads the catalogue, curriculum quality report, resource probe and reviewer-packet index. It writes generated files under artifacts/resource-verification-package/, which is gitignored; review and regenerate the ZIP separately when intentionally publishing a new bundle.

**Important limitations:** this package is evidence for human review, not an approval. No course has human sign-off, and no video/interactive resource has level-4 playback verification. Check the generation timestamp and unresolved-resource list before relying on its results.
