yepKeyNav
==========

JQuery plugin provides a way to navigate or select items on a page using keyboad shortcuts.

# Dependencies
 https://github.com/tzuryby/jquery.hotkeys/ 
 and http://flesler.blogspot.com/2007/10/jqueryscrollto.html


# USAGE

    $("selector of a list").yepNavKey()

all itens with class yep-key-nav are navigable

example to return the jquery selector for all selected itens:
 
    $("selector of a list").yepNavKey('selected', function(ret) {
        ret.each(function() {
                //do something
        });
    });

## Events

current.yepKeyNav - when the current item is changed
lostCurrent.yepKeyNav - when item lost the current selecion
select.yepKeyNav - when an item is selected
unselect.yepKeyNav - when an item is unselected

Example:

    $("list").on('current.yepKeyNav', function(evt) {
        $current = $(event.target)

        #... do someting with new $current item
    })


## Default Options
    classes: {
        navigable: "yep-key-nav",
        currentItem: "yep-key-nav-current",
        selectedItem: "yep-key-nav-selected",
        itemSelector: "yep-key-nav-selector", //should be a checkbox
        selectAll: "yep-key-nav-select-all" //should be a checkbox, when cliecked all itens will be selected or unselected
    },
    scrollSelector: 'window', //selector of panel with scroll of items
    shortcuts: {
        next: "j",
        prev: "k",
        toggleSelect: "x"
    }


# Default Shortcuts

    j -> next element
    k -> previous element
    x -> select current element
    space -> exec a configured function

# BUGS

- navigable itens are found on entire document, and not only on $(this) scope
