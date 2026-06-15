---
layout: post
title: "ML Engineer @ Magic Hour (Feb 2026 - Present)"
category: internship
---

joined [Magic Hour](https://magichour.ai/) in feb 2026 and have been working on production ML systems across image and video generation.

**Inference optimization**

• Made Klein4B apt for real-time image editing by applying compile-side improvements for DiT and VAE, caching, faster attention, and NVFP4 weight + activation quantization with a lighter VAE, which reduced latency on an RTX 6000 Pro from ~324ms to ~128ms at 576x384 and 4 steps

**Workflows around image and video models**

• Built workflows around image and video models, including ltx2.3 workflows with lipdub LoRA for lip sync with external audio
• Built another ltx workflow for scene outpainting

**Validation**

• Iterated and validated these workflows on [Modal](https://modal.com/) GPUs
