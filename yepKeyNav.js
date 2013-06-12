/*
 *  Project: YepKeyNav
 *  Version: 1.0
 *  Description: JQuery plugin provides a way to navigate or select items on a page using keyboad shortcuts.
 *  Author: Yepdev - José Coelho
 *  Dependencies: https://github.com/tzuryby/jquery.hotkeys/ and http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 *
 *	plugin structure from: https://github.com/jquery-boilerplate/boilerplate with some modifications
 */


;(function ($, window, document, undefined) {

    $.widget('yep.yepKeyNav', {
        options: {
            classes: {
                navigable: "yep-key-nav",
                currentItem: "yep-key-nav-current",
                selectedItem: "yep-key-nav-selected",
                itemSelector: "yep-key-nav-selector", //should be a checkbox
                selectAll: "yep-key-nav-select-all" //should be a checkbox, when cliecked all itens will be selected or unselected
            },
            scrollSelector: 'window',
            shortcuts: {
                next: "j",
                prev: "k",
                toggleSelect: "x"
            }
        },

        _create: function () {
            console.debug("yepKeyNav: init for "+$(this.element).attr('class'))
            var self = this; //used to maintain class context on events


            shortcut.add(self.options.shortcuts.toggleSelect, $.proxy(self.toggleSelectByEvent,self));
            shortcut.add(self.options.shortcuts.next, $.proxy(self.next,self));
            shortcut.add(self.options.shortcuts.prev, $.proxy(self.prev,self));

            $($(this.element)).on('click',"."+self.options.classes.navigable, $.proxy(self.currentByEvent,self));
            $($(this.element)).on('click',"."+self.options.classes.itemSelector,$.proxy(self.toggleSelectByEvent,self));
            $($(this.element)).on('click','.'+self.options.classes.selectAll, $.proxy(self.selectAll,self))

            this.nav(0);
        },
        selectAll: function(evt) {
            evt.stopPropagation()

            var self = this
            var $checkbox = $(evt.target);

            var checked = $checkbox.is(':checked')


            $all = $("."+this.options.classes.navigable)
            $all.each(function(idx) {
                if(checked) {
                    self.select($(this))
                } else {
                    self.unselect($(this))
                }
            })

        },
        currentByEvent: function(evt) {
            var $item = $(evt.target);

            if(!$item.hasClass(this.options.classes.navigable)) {
                $item = $item.parents("."+this.options.classes.navigable)
            }

            if(!$item.hasClass(this.options.classes.currentItem)) {
                this.option('current',$item);
            }

        },
        current: function() {
            return $(this.element).find("."+this.options.classes.currentItem)
        },
        _currentChangeAndTriggerEvt: function($item) {
            if(this.options.oldCurrent) {
                this.options.oldCurrent.trigger('lostCurrent.yepKeyNav');
            }

            //remove from others
            $("."+this.options.classes.currentItem).removeClass(this.options.classes.currentItem);
            $item.addClass(this.options.classes.currentItem);

            $item.parents(this.options.scrollSelector).scrollTo($item,200,{offset:-200});

            $item.trigger('current.yepKeyNav');

            this.options.current = $item;
            this.options.oldCurrent = $item;

            return $item;
        },
        _setOption: function(key,value) {
            switch(key) {
                case 'current':
                    this._currentChangeAndTriggerEvt(value);
            }
        },

        //navigate on elements, number can be positive or negative
        nav: function(number) {
            var $all, $current, $new_current, current_position, next_position = 0;

            $all = $("."+this.options.classes.navigable)
            if(!$all.length) {
                console.debug("yepKeyNav: There's no items to nav")
            } else {
                $current = this.option('current');

                current_position = $current ? $all.index($current) : 0;

                console.debug("current_position: "+current_position)
                next_position = current_position+number;
                console.debug("next_position: "+next_position)

                if(next_position >= $all.length) {
                    next_position = 0;
                } else if(next_position < 0) {
                    next_position = $all.length-1
                }

                $new_current = $($all[next_position]);
                this.option('current',$new_current);
            }

        },
        next: function () {
           console.debug("yepKeyNav: next item")
           this.nav(1)
        },
        prev: function() {
           console.debug("yepKeyNav: previous item")
           this.nav(-1)
        },
        toggleSelectByEvent: function(evt) {
            $item = $(evt.currentTarget);

            //currentTarget is a selector? then should select the navigable item of this selector
            if($item.hasClass(this.options.classes.itemSelector)) {
                this.toggleSelect($item.parents("."+this.options.classes.navigable));
            } else { //otherwise, should select current navigable item
                this.toggleSelect();
            }

        },
        select: function($item) {
            console.debug("yepKeyNav: adding selection");
            $item.addClass(this.options.classes.selectedItem);

            var $selector = $item.find("."+this.options.classes.itemSelector)

            $selector.prop("checked",true);

            $item.trigger('select.yepKeyNav');
        },
        unselect: function($item) {
            console.debug("yepKeyNav: removing selection");
            $item.removeClass(this.options.classes.selectedItem);

            var $selector = $item.find("."+this.options.classes.itemSelector)

            $selector.prop("checked",false);

            $item.trigger('unselect.yepKeyNav');
        },
        toggleSelect: function($item) {

            if(!$item) {
                $item = this.current();
            }



            if($item.hasClass(this.options.classes.selectedItem)) {
                this.unselect($item)
            } else {
                this.select($item)
            }

        },
        selected: function(callback) {
            callback( $("."+this.options.classes.selectedItem) );
        }
    });


})(jQuery, window, document);
