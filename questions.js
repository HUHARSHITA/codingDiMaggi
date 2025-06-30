const questions = [
    {
        prompt: "Write a function `add(a, b)` that returns the sum of two numbers.",
        testCode: "print(add(5, 3))",
        expectedOutput: "8"
    },
    {
        prompt: "Write a function `multiply(a, b)` that returns the product of two numbers.",
        testCode: "print(multiply(4, 6))",
        expectedOutput: "24"
    },
    {
        prompt: "Write a function `greet(name)` that returns a greeting string like 'Hello, [name]!'",
        testCode: "print(greet('Coder'))",
        expectedOutput: "Hello, Coder!"
    },
    {
        prompt: "Write a function `is_even(n)` that returns True if a number is even, False otherwise.",
        testCode: "print(is_even(7))",
        expectedOutput: "False"
    },
    {
        prompt: "Write a function `reverse_string(s)` that reverses a string.",
        testCode: "print(reverse_string('Maggi'))",
        expectedOutput: "iggaM"
    },
    {
        prompt: "Write a function `factorial(n)` that calculates the factorial of a number.",
        testCode: "print(factorial(5))",
        expectedOutput: "120"
    },
    {
        prompt: "Write a function `celsius_to_fahrenheit(celsius)` that converts Celsius to Fahrenheit.",
        testCode: "print(celsius_to_fahrenheit(25))",
        expectedOutput: "77.0"
    },
    {
        prompt: "Write a function `is_palindrome(s)` that checks if a string is a palindrome (reads the same forwards and backward).",
        testCode: "print(is_palindrome('madam'))",
        expectedOutput: "True"
    },
    {
        prompt: "Write a function `square(n)` that returns the square of a number.",
        testCode: "print(square(7))",
        expectedOutput: "49"
    },
    {
        prompt: "Write a function `is_positive(n)` that returns True if the number is positive, else False.",
        testCode: "print(is_positive(-3))",
        expectedOutput: "False"
    },
    {
        prompt: "Write a function `max_of_two(a, b)` that returns the greater of two numbers.",
        testCode: "print(max_of_two(10, 20))",
        expectedOutput: "20"
    },
    {
        prompt: "Write a function `min_of_three(a, b, c)` that returns the smallest of three numbers.",
        testCode: "print(min_of_three(3, 1, 2))",
        expectedOutput: "1"
    },
    {
        prompt: "Write a function `to_uppercase(s)` that converts a string to uppercase.",
        testCode: "print(to_uppercase('hello'))",
        expectedOutput: "HELLO"
    },
    {
        prompt: "Write a function `area_of_circle(r)` that returns the area of a circle (π = 3.14).",
        testCode: "print(area_of_circle(3))",
        expectedOutput: "28.26"
    },
    {
        prompt: "Write a function `is_vowel(ch)` that returns True if a character is a vowel.",
        testCode: "print(is_vowel('e'))",
        expectedOutput: "True"
    },
    {
        prompt: "Write a function `count_vowels(s)` that counts vowels in a string.",
        testCode: "print(count_vowels('Maggi'))",
        expectedOutput: "2"
    },
    {
        prompt: "Write a function `fibonacci(n)` that returns the nth Fibonacci number.",
        testCode: "print(fibonacci(6))",
        expectedOutput: "8"
    },
    {
        prompt: "Write a function `sum_list(lst)` that returns the sum of all elements in a list.",
        testCode: "print(sum_list([1, 2, 3, 4]))",
        expectedOutput: "10"
    },
    {
        prompt: "Write a function `count_words(s)` that counts words in a sentence.",
        testCode: "print(count_words('Choti Maggi Badi Coding'))",
        expectedOutput: "4"
    },
    {
        prompt: "Write a function `is_prime(n)` that checks if a number is prime.",
        testCode: "print(is_prime(13))",
        expectedOutput: "True"
    },
    {
        prompt: "Write a function `average(a, b, c)` that returns the average of three numbers.",
        testCode: "print(average(3, 6, 9))",
        expectedOutput: "6.0"
    },
    {
        prompt: "Write a function `char_frequency(s, ch)` that returns the count of a character in a string.",
        testCode: "print(char_frequency('banana', 'a'))",
        expectedOutput: "3"
    },
    {
        prompt: "Write a function `remove_duplicates(lst)` that removes duplicates from a list.",
        testCode: "print(remove_duplicates([1, 2, 2, 3]))",
        expectedOutput: "[1, 2, 3]"
    },
    {
        prompt: "Write a function `sort_descending(lst)` that returns the list sorted in descending order.",
        testCode: "print(sort_descending([3, 1, 2]))",
        expectedOutput: "[3, 2, 1]"
    },
    {
        prompt: "Write a function `multiply_list(lst)` that returns the product of all numbers in a list.",
        testCode: "print(multiply_list([1, 2, 3, 4]))",
        expectedOutput: "24"
    },
    {
        prompt: "Write a function `string_length(s)` that returns the length of a string.",
        testCode: "print(string_length('Maggi'))",
        expectedOutput: "5"
    },
    {
        prompt: "Write a function `divisible_by_five(n)` that returns True if divisible by 5.",
        testCode: "print(divisible_by_five(25))",
        expectedOutput: "True"
    },
    {
        prompt: "Write a function `is_sorted(lst)` that checks if the list is sorted in ascending order.",
        testCode: "print(is_sorted([1, 2, 3]))",
        expectedOutput: "True"
    },
    {
        prompt: "Write a function `middle_element(lst)` that returns the middle element of a list.",
        testCode: "print(middle_element([1, 2, 3, 4, 5]))",
        expectedOutput: "3"
    }
];