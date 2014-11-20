---
layout: post
title: "Defining methods dinamycally (metaprogramming)"
date: 2014-11-18 11:00:57 -0500
comments: true
categories: [development, ruby, metaprogramming]
---

In ruby, we have the power to create code that generates code. This can
be useful in some situations (let's say we have a hash response from an
API and we want to create a method for each key dinamycally).

~~~~
# really long response with data for a person

{ address: "06482 Wallingford CT", age: 12, nacionality: "german", gender: "male",
  religion: "Buddhism", city: "UIO" }
~~~~
{:.language-ruby}

Since the code for fetching an specific value is the same for all
values: `fetch_from_response(key)`, we can use `define_method` for each key we know

~~~~
class Person
  KEYS = %i(address, age, nacionality, gender, religion, city)

  def initialize(id, request)
    @id = id
    @response = request
  end

  KEYS.each do |key|
    define_method(key) { fetch_from_response key }
  end

  private

  def fetch_from_response(name)
    @request.response.fetch(name)
  end
end
~~~~
{:.language-ruby}

This will create new methods for `Person`, depending on what keys we have

~~~~
request = Request.new api_key: 'any key'

any_person = Person.new("1234", request)
any_person.methods - Object.methods
# => [:address, :age, :nacionality, :gender, :religion, :city]

any_person.address # => "06482 Wallingford CT"
~~~~
{:.language-ruby}

Ruby also provides this and other usefull methods for defining
object/instance and class methods

## Object Methods
As we saw early, we can use `define_method` for creating new object methods, but since it is a private method it can
only be used inside a class definition. If we want to define it outside
we can use `class_eval`

~~~~
Person.class_eval do
  def name
    # more code
  end
end

# defining multiple methods

Person.class_eval do
  KEYS.each do |key|
    define_method(key) do
      # code...
    end
  end
end
~~~~
{:.language-ruby}

Inside the block the code is evaluated as if we were inside the class

### Instance Methods

Defining a method over an instance creates a method for that
specific 'object'

~~~~
# we're using the same instance we created before
any_person.is_a? Person # => True

def any_person.name
  # code code code!!!
end
~~~~
{:.language-ruby}

The same can be achieved opening it's eigennclass

~~~~
class << any_person
  def name
    # coooode....
  end
end
~~~~
{:.language-ruby}

This method lives as long as that instance exists

## Class Methods

Similar to instance methods we can define a new one over the class or
with an eigennclass

~~~~
def Person.name
  # code code code!!!
end

# or

class << Person
  def name
    # coooode....
  end
end
~~~~
{:.language-ruby}

Last but not least, I should remind you that defining methods with metaprogramming can be
[slow](http://tenderlovemaking.com/2013/03/03/dynamic_method_definitions.html), even [DANGEROUS!!!!!!](http://justinleitgeb.com/ruby/safer-programming-in-ruby/), so use it wisely, remember :

> With great power comes great responsability
