+++
date = "2018-08-23T01:07:26+00:00"
draft = false
tags = ["linux", "docker", "containers"]
title = "Building better containers: A Survey of Container Build Tools"
author = "jpic"
+++

{{< youtube 5D_SqLv92V8 >}}

Building Better Containers: A Survey of Container Build Tools [I] - Michael Ducy, Chef CNCF [Cloud Native Computing Foundation] Published on Dec 15, 2017 If you stick to the “industry standard” method of building containers (Dockerfiles), it’s easy to build containers that contain libraries, tools, binaries, and more that you don’t need. One survey showed that over 75% of containers contain a full Operating Systems. So how can you build containers that only contain the bits you require to run a particular application, and nothing more. This talk will cover various tools in the open source community that provide better methods for building containers, no matter the underlying container runtime. We will explore Bazel (along with Distroless), Smith (from Oracle), and Habitat (from Chef), and we will cover the benefits and drawbacks of each method. A short demo of each tool will be included. About Michael Ducy Born on the rolling plains of central Illinois corn fields, Michael Ducy started his technology journey at a young age. Always curious, he was once threatened that he’d never have toys bought for him again if he didn’t stop taking them apart to see how they worked. Raised in a blue collar family, his first workbench was given to him at the age of 5. His first programming language was BASIC, at the ripe young age of 6. Michael quickly saw the parallels between building physical objects on his workbench, and building virtual objects with his computer. Still an avid woodworker, Michael finds joy in helping people understand technology and the impact it has on the work that we do, and the lives that we lead.
