---
title: "network-pattern-circuit-breaker"
description: "in-memory calls vs remote callsremote calls can fail, hang without response until timeout. if there are many callers on unresponsive supplier. critica"
date: 2022-09-14T07:13:23.744Z
tags: []
---
in-memory calls vs remote calls
- remote calls can fail, hang without response until timeout. 
- if there are many callers on unresponsive supplier. critical resource failure across system may result. 

circuit-breaker pattern
- wrap function call in circuit breaker object that monitors failures
- if failure reaches threshold. -> circuit breaker returns all further calls as error. 
- usage - Hystrix, Resilience4j

![](/images/f4438eb8-956d-4d3f-bd41-33dd669ac302-image.png)


ruby code example
```ruby
class CircuitBreaker...

  attr_accessor :invocation_timeout, :failure_threshold, :monitor
  def initialize &block
    @circuit = block
    @invocation_timeout = 0.01
    @failure_threshold = 5
    @monitor = acquire_monitor
    reset
  end
```

if circuit-breaker open return error
if closed calls block. 
```ruby
class CircuitBreaker...

  def call args
    case state
    when :closed
      begin
        do_call args
      rescue Timeout::Error
        record_failure
        raise $!
      end
    when :open then raise CircuitBreaker::Open
    else raise "Unreachable Code"
    end
  end
  def do_call args
    result = Timeout::timeout(@invocation_timeout) do
      @circuit.call args
    end
    reset
    return result
  end
```

for timeout. failure counter, resets if success
```ruby
class CircuitBreaker...

  def record_failure
    @failure_count += 1
    @monitor.alert(:open_circuit) if :open == state
  end
  def reset
    @failure_count = 0
    @monitor.alert :reset_circuit
  end
```

![](/images/b470e1a1-84b2-452e-83df-96acc0364045-image.png)

### Source
https://martinfowler.com/bliki/CircuitBreaker.html

---
network-call-pattern-OOO-threshold failure-return
