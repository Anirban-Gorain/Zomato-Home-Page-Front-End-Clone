/* J-query calling section */

jQuery(document).ready(function ()
{

    /* Preloader */

    jQuery('#_preloader').delay(10).fadeOut();

    /* Fit positions on window resize */

    $(window).resize(function() {

        _add_Suggestion_Container_For_City(true);
        _add_Suggestion_Container_For_City_Location(true);

    });

    /* Search suggestion */

    _add_Suggestion_Container_For_City(false);

    jQuery("._city_Bar, ._reverse_V_Icon").click(function (_event)
    {
       
        jQuery("#_city_Suggestion").css("display", "block");
        
    });

    $(document).mouseup(function(_event)
    {

        /* Selecting that elements over which if user click suggestion container shouldn't hide */

        let _ignore_Elements = new Array();

        /* From multiple class of a element selection the first class */

        _ignore_Elements[0] = jQuery("._location_Icon").attr("class").split(' ')[0];
        _ignore_Elements[1] = jQuery("._reverse_V_Icon").attr("class").split(' ')[0];

        if(!(_ignore_Elements.includes(_event.target.className) || _ignore_Elements.includes(_event.target.id)))
        {

            jQuery("#_city_Suggestion").fadeOut(100);

        }

        /* For city location */

        jQuery("#_city_Location_Suggestion").fadeOut(100);

    });

    _add_Suggestion_Container_For_City_Location(false);

    jQuery("._city_Location").click(function (_event)
    {
       
        jQuery("#_city_Location_Suggestion").css("display", "block");
        
    });

    /* Suggestion filter */

    jQuery("._city_Bar, ._city_Location").keyup(function (_event)
    {

        _suggestion_Filter(_event);
        
    });

    /* Select box */

    jQuery("._items").slideToggle(1);

    jQuery("._custom_Select_Box").click(function ()
    {

        // if (!_is_Visible)
        // {

            jQuery("._items").slideToggle(130);
            // _is_Visible = true;
            
        // }
        // else
        // {

        //     jQuery("._items").slideUp("fast");
        //     _is_Visible = false;

        // }
        
    });

});

function _add_Suggestion_Container_For_City(_is_Resizing)
{

    if(!_is_Resizing)
    {

        let _city_Name = new Array();
        _city_Name[0] = "Calcutta"; _city_Name[1] = "Mumbai"; _city_Name[2] = "Delhi"; _city_Name[3] = "Bangalore"; _city_Name[4] = "Surat"; _city_Name[5] = "Nagpur"; _city_Name[6] = "Jaipur"; _city_Name[7] = "Lucknow"; _city_Name[8] = "Indore"; _city_Name[9] = "Bhopal"; _city_Name[10] = "Agra"; _city_Name[11] = "Allahabad"; _city_Name[12] = "Varanasi"; _city_Name[13] = "Jodhpur"; _city_Name[14] = "Madurai"; _city_Name[15] = "Chandigarh"; _city_Name[16] = "Moradabad"; _city_Name[17] = "Durgapur"; _city_Name[18] = "Saharanpur"; _city_Name[19] = "Sholapur";

        let _suggestion_Container_City = document.createElement("div");
        let _ul = document.createElement("ul");
        
        _city_Name.forEach(_cities =>
        {

            let _li_With_City = document.createElement("li");
            // _li_With_City.setAttribute("class", "_cities");
            _li_With_City.append(_cities);
            _ul.append(_li_With_City);
            
        });

        _suggestion_Container_City.appendChild(_ul);
        _suggestion_Container_City.setAttribute("id", "_city_Suggestion");

        jQuery("._header").after(_suggestion_Container_City);

        jQuery("#_city_Suggestion ul li").click(function (_event)
        {
            
            jQuery("._city_Bar").attr("value", _event.target.innerHTML);
            
        });

    }


    let _position_Of_Location_Icon = jQuery("._location_Icon").offset();
    let _width_Of_reverse_V_Icon =jQuery("._city").css("width");
    let _height_Of_reverse_V_Icon =jQuery("._city").css("height");

    jQuery("#_city_Suggestion").css({

        "width" : _width_Of_reverse_V_Icon,
        "top" : _position_Of_Location_Icon.top + parseFloat(_height_Of_reverse_V_Icon) + "px",
        "left" : _position_Of_Location_Icon.left + "px",
        "display" : "none"

    });

}

function _add_Suggestion_Container_For_City_Location(_is_Resizing)
{
    
    if(!_is_Resizing)
    {

        let _location_Name = new Array();
        _location_Name[0] = "Street 1"; _location_Name[1] = "Street 2"; _location_Name[2] = "Street 3"; _location_Name[3] = "Street 4"; _location_Name[4] = "Street 5"; _location_Name[5] = "Street 6"; _location_Name[6] = "Street 7"; _location_Name[7] = "Street 8"; _location_Name[8] = "Street 9"; _location_Name[9] = "Street 10"; _location_Name[10] = "Street 11"; _location_Name[11] = "Street 12"; _location_Name[12] = "Street 13"; _location_Name[13] = "Street 14"; _location_Name[14] = "Street 15"; _location_Name[15] = "Street 16"; _location_Name[16] = "Street 17"; _location_Name[17] = "Street 18"; _location_Name[18] = "Street 19"; _location_Name[19] = "Street 20";

        let _suggestion_Container_City_Location = document.createElement("div");
        let _ul = document.createElement("ul");
        
        _location_Name.forEach(_cities =>
        {

            let _li_With_City = document.createElement("li");
            _li_With_City.append(_cities);
            _ul.append(_li_With_City);
            
        });

        _suggestion_Container_City_Location.appendChild(_ul);
        _suggestion_Container_City_Location.setAttribute("id", "_city_Location_Suggestion");

        jQuery("._header").after(_suggestion_Container_City_Location);

        jQuery("#_city_Location_Suggestion ul li").click(function (_event)
        {
            
            jQuery("._city_Location").attr("value", _event.target.innerHTML);
            
        });

    }

    let _position_Of_City_Icon = jQuery("._city_Icon").offset();
    let _width_Of_City_Location =jQuery("._find_Restaurant_Bar").css("width");
    let _height_Of_City_Location =jQuery("._city_Location").css("height");

    jQuery("#_city_Location_Suggestion").css({

        "width" : _width_Of_City_Location,
        "top" : _position_Of_City_Icon.top + parseFloat(_height_Of_City_Location) + "px",
        "left" : _position_Of_City_Icon.left + "px",
        "display" : "none"

    });
}

function _suggestion_Filter(_event)
{

    
    let _which_Element = _event.target.className.split(" ")[0];
    
    if(_which_Element === "_city_Bar")
    {
        
        let _all_Cities = jQuery("#_city_Suggestion ul li");

        if((_event.target.value.length === 0))
        {

            if(_event.originalEvent.code === "Backspace")
            {

                for(let _iterate = 0; _iterate < _all_Cities.length; _iterate++)
                {

                    _all_Cities[_iterate].style.display = "block";

                }

            }

            return 0;
            
        }

        for(let _iterate = 0; _iterate < _all_Cities.length; _iterate++)
        {

            if(!(_all_Cities[_iterate].innerHTML.toLowerCase()).includes(_event.target.value.toLowerCase()))
            {
                
                _all_Cities[_iterate].style.display = "none";

            }
            else
            {

                _all_Cities[_iterate].style.display = "block";

            }
        
        }
        
    }
    else if(_which_Element === "_city_Location")
    {

        let _all_Cities_Location = jQuery("#_city_Location_Suggestion ul li");

        if((_event.target.value.length === 0))
        {

            if(_event.originalEvent.code === "Backspace")
            {

                for(let _iterate = 0; _iterate < _all_Cities_Location.length; _iterate++)
                {

                    _all_Cities_Location[_iterate].style.display = "block";

                }

            }

            return 0;
            
        }

        for(let _iterate = 0; _iterate < _all_Cities_Location.length; _iterate++)
        {

            if(!(_all_Cities_Location[_iterate].innerHTML.toLowerCase()).includes(_event.target.value.toLowerCase()))
            {
                
                _all_Cities_Location[_iterate].style.display = "none";

            }
            else
            {

                _all_Cities_Location[_iterate].style.display = "block";

            }
        
        }

    }
    
}