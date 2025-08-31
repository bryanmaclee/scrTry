# SCRML (Scriptable Markup Language) Specification

## Overview
SCRML is a programming language that compiles to vanilla JavaScript, HTML, and CSS. It features a context-aware parser that automatically switches between script, markup, and CSS contexts without explicit language tags.

## Core Philosophy
- **Rust-inspired**: Compile-time safety, strict typing, clear error messages
- **Multi-paradigm**: Supports OOP, procedural, and functional programming (optimized for functional)
- **Performance-focused**: Compiler optimizations prioritized over human-readable output
- **LSP support**: Essential for modern development experience

## Context System

### Context Types
1. **Script Context (Default)**: Functions, variables, control flow, expressions
2. **Markup Context**: HTML elements, static DOM structure
3. **CSS Context**: Styling rules (Tailwind-inspired approach)

### DOM Selector Shorthand
SCRML provides shorthand selectors for common DOM queries:
- **`##elementId`**: `document.getElementById("elementId")`
- **`..className`**: `document.querySelector(".className")`
- **`--dataAttribute`**: `document.querySelector("[data-attribute]")`

### Example Usage
```scrml
// Get element by ID
##totalCount.textContent = "5";

// Get element by class
..todoItem.forEach(item => item.classList.add("completed"));

// Get element by data attribute
..priorityHigh.forEach(item => item.style.borderColor = "red");
```

### Context Switching Rules
- **Script Context**: Triggered by JavaScript keywords, function calls, variable assignments
- **Markup Context**: Triggered by top-level HTML elements
- **Implicit Backticks**: In script context, HTML syntax becomes template literals automatically

### Example Context Switching
```scrml
// Script context (default)
function createTask() {
    // Still in script context
    return <li>Task content</li>  // Becomes: return `<li>Task content</li>`
}

// Markup context
<div>
    ${someFunction()}  // Function call if defined, literal text if not
</div>
```

## Type System

### Primitives
- **Number**: `#` (e.g., `5`, `12`, `3529483254983`)
- **String**: `""` (e.g., `"hello"`)
- **Boolean**: `|` (e.g., `true|false`)
- **Type**: Special primitive for type operations

### Shapes (Custom Type Constraints)
Shapes are constraints applied to primitives, not separate types.

#### Syntax Options
- **Shorthand**: `aNum = (>4 && <10 && !%2)`
- **Explicit**: `aNum:Number(>4 && <10 && !%2) = (someNum){ return someNum }`
- **Shape Constructor**: `%myShape = (>4 && <10)` (defines reusable shape)

#### Shape Composition
```scrml
%oddNumber = (!%2)
%rangeNumber = (>4 && <10)
%oddRangeNumber = (oddNumber && rangeNumber)
```

#### Number Shape Examples
```scrml
// Ranges
aNumBetween = [>400 && <800]        // 401 - 799
aNumBetween2 = [>=400 && <=800]     // 400 - 800
aNumOutside = [<400 || >800]        // ... - 399, 801 - ...

// Limits
aNumBelow = [<400]                  // ... - 399
aNumAbove = [>399]                  // 400 - ...

// Algebraic patterns
aMultiple = [!%4]                   // Multiple of 4 (4,8,12,...)
aM2 = [!%3+2]                       // Multiple of 3 base 2 (2,5,8,...)
am3 = [%5 + 3 && >17]              // Multiple of 5 base 3 and >17 (22,27,32,...)
am4 = [%5 && !%3]                   // Multiple of 5 except multiples of 3 (5,10,20,25,35,...)
```

### Data Structures
- **Object**: `{}`
- **Array**: `[]`
- **Set**: `-`
- **Tuple**: Ordered collections
- **Enum**: Enumerated types
- **Document Object**: HTML elements (all of type "document-object")

### Document Object Shapes
```scrml
%taskItem = (<li> with required properties { id, content })
%buttonElement = (<button> with required properties { onClick, text })
```

## Variable System

### Declaration Types
- **let (Default)**: `variable = value` - Immutable, deleted once called or falls out of scope
- **const**: `*variable = value` - Immutable, maintains normal JavaScript behavior

### Variable Lifetime Optimization
The default `let` behavior allows for automatic cleanup:
```scrml
updateStats() {
    total = todos.length;           // let variable, deleted after first use
    completed = todos.filter(t => t.completed).length;  // deleted after first use
    pending = total - completed;    // deleted after first use
    
    ##totalCount.textContent = total;
    ##completedCount.textContent = completed;  // Error: completed is deleted
    ##pendingCount.textContent = pending;      // Error: pending is deleted
}

// To retain variables through the scope, use const:
updateStats() {
    total = todos.length;
    *completed = todos.filter(t => t.completed).length;
    pending = total - completed;
    
    ##totalCount.textContent = total;
    ##completedCount.textContent = completed;  // Works: const persists
    ##pendingCount.textContent = pending; 
}
```

### Examples
```scrml
// let variables
task = "buy groceries"               // kind: LET, type: STRING, value: "buy groceries"
log(task)                           // "buy groceries"
log(task)                           // undefined (deleted after first use)

// const variables
*taskId = "task_123"                // kind: CONST, type: STRING, value: "task_123"
log(taskId)                         // "task_123"
log(taskId)                         // "task_123" (persists)
```

## Function System

### Declaration Syntax
```scrml
// Basic function
functionName(parameters) {
    // function body
}

// Function with return type annotation
functionName:<returnShape>(parameters) {
    // function body
    return value
}
```

### Examples
```scrml
// Function returning document object
task:<task>(task) {
    task.split(" ").join("_")
    return <li id=~>${task}<button onClick="taskDone(~)"></li>
}

// Function with shape validation
addTask:<boolean>(task) {
    // Compiler ensures return value matches boolean shape
    return true
}
```

## File Structure

### File Types
- **`.scrml`**: Mixed content (HTML, CSS, JS together) - default
- **`.js`**: Post-compiled JavaScript output
- **`.css`**: Post-compiled CSS output  
- **`.html`**: Post-compiled HTML output

### Organization
- **Mixed content by default**: Most files contain HTML, CSS, and JS together
- **Document components**: Similar to web components but streamlined
- **ES6 modules**: Compiles to modern JavaScript module system

## Compilation

### Output
- **JavaScript**: ES6 modules, optimized for performance
- **HTML**: Standard HTML5
- **CSS**: Efficient CSS (Tailwind-inspired utility classes)

### Error Handling
- **Compile-time validation**: Primary error detection
- **Runtime checking**: Optional (future feature)
- **Clear error messages**: Helpful compiler feedback with stack traces
- **Type violations**: Compilation fails with descriptive errors

## Key Design Principles

1. **Context Awareness**: Parser automatically switches between language contexts
2. **Shape-Based Types**: Constraints and validation built into type system
3. **Compile-Time Safety**: Errors caught early, robust type checking
4. **Performance First**: Optimized output over human readability
5. **No Inheritance**: scrml doesn't support inheritance (use JavaScript for OOP patterns)
6. **Functional Focus**: Optimized for functional programming paradigms

## Future Considerations

- **Runtime validation**: Optional compile-time flag for runtime type checking
- **IDE development**: Building code editor in scrml itself
- **LSP implementation**: Language server protocol support
- **CSS system**: Tailwind-inspired styling approach
- **Machine types**: State machine patterns (to be defined)
