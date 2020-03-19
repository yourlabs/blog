+++
date = "2020-02-08T10:27:00+00:00"
draft = false
tags = []
title = "Developping on Tezos with custom gas restrictions"
+++
Then next Tezos Protocol update, Carthage net, will increase the gas
restrictions allowing the development of hungrier smart contracts. In
this post, we document how to update these hard limits to arbitrary
values letting developers implement contracts in view of protocol
updates. For instance, the gas restrictions will increase by multiple
folds before the end of the year.

We develop on the Tezos sandbox, the simplest is to pull Yourlabs'
docker image:

``` {.bash org-language="sh"}
docker run -t -p 8732:8732 yourlabs/tezos
```

But since we want to modify some of the sandbox parameters, we will need
to the sources to rebuild the image:

``` {.bash org-language="sh" session="tuto"}
git clone git@yourlabs.io:oss/containers.git
cd containers/tezos
```

We not want to modify the entry `hard_gas_limit_per_operation` and
`hard_gas_limit_per_block` of the file `sandbox-parametrs.json` to
2,000,000 and 20,000,000 respectively and rebuild the image:

``` {.bash org-language="sh" session="tuto"}
sed -i 's/"hard_gas_limit_per_operation": "[0-9]*"/"hard_gas_limit_per_operation": "9000000"/g' sandbox-parameters.json
sed -i 's/"hard_gas_limit_per_block": "[0-9]*"/"hard_gas_limit_per_block": "90000000"/g' sandbox-parameters.json
cat sandbox-parameters.json | jq .hard_gas_limit_per_operation  # => 9000000
```

We can now build and run the docker image with port redirection so we
can communicate with the sandbox from outside the docker:

``` {.bash org-language="sh" session="tuto"}
docker build -t tz-sandbox .
docker run -t -d -p 8732:8732 tz-sandbox
```

This will start the sandbox in a container bridging the standard port.
You can verify that it works by running the following command:

``` {.bash org-language="sh" session="tuto"}
curl http://localhost:8732/chains/main/blocks/head/context/constants | jq .hard_gas_limit_per_operation # => 9000000
```

As you can see, by curling the sandbox API, our constant was updated

``` {.bash org-language="sh" session="tuto"}
curl http://localhost:8732/chains/main/blocks/head/context/constants | jq .hard_gas_limit_per_block # => 9000000
```

We will now run a Michelson contract that consumes over 800,000 gas for
`--arg 260000`:

    parameter int ;
    storage unit ;
    code { CAR ;
           DUP ; NEQ ; LOOP { PUSH int 1 ; SWAP ; SUB ; DUP ; NEQ } ;
           DROP ;
           UNIT ;
           NIL operation ;
           PAIR }

``` {.bash org-language="sh" session="tuto"}
docker exec $(docker ps -q) /bin/bash -c 'tezos-client originate contract TEST_GAS_CONTRACT transferring 42 from bootstrap1 running test-contract.tz --burn-cap 5'
```

``` {.bash org-language="sh" session="tuto"}
docker exec $(docker ps -q) /bin/bash -c 'tezos-client transfer 5 from bootstrap1 to TEST_GAS_CONTRACT --arg 360000'
```

As you can see, this operation used 1367765 gas which is well above the
Babylon net gas limits. We can now try to execute a much hungrier
contract and see that it fails as expected:

``` {.bash org-language="sh" session="tuto"}
docker exec $(docker ps -q) /bin/bash -c 'tezos-client transfer 5 from bootstrap1 to TEST_GAS_CONTRACT --arg 3600000'
```

The operation failed as it is over the gas limit per operation.
    
