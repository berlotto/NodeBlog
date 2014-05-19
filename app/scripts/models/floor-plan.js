(function(exports, gmaps)
{
   /** @constructor */
   FloorPlan.prototype = new gmaps.OverlayView();
   function FloorPlan(bounds, image, map) {

      // Initialize all properties.
      this._bounds = bounds;
      this._image = image;
      this._map = map;

      // Define a property to hold the image's div. We'll
      // actually create this div upon receipt of the onAdd()
      // method so we'll leave it null for now.
      this._div = null;

      // Explicitly call setMap on this overlay.
      this.setMap(map);
   }
// [END region_constructor]

// [START region_attachment]
   /**
    * onAdd is called when the map's panes are ready and the overlay has been
    * added to the map.
    */
   FloorPlan.prototype.onAdd = function() {

      var div = document.createElement('div');
      div.id = 'floorDiv'
      div.style.borderStyle = 'none';
      div.style.borderWidth = '0px';
      div.style.position = 'absolute';

      // Create the img element and attach it to the div.
      var img = document.createElement('img');
      img.src = this._image;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.position = 'absolute';
      div.appendChild(img);
      $(div).css({"-webkit-transform":"rotate(72.5deg) scaleX(0.9) scaleY(1.19) translateX(2.5%)"});
      this._div = div;

      // Add the element to the "overlayLayer" pane.
      var panes = this.getPanes();
      panes.overlayLayer.appendChild(div);
   };
// [END region_attachment]

// [START region_drawing]
   FloorPlan.prototype.draw = function() {

      // We use the south-west and north-east
      // coordinates of the overlay to peg it to the correct position and size.
      // To do this, we need to retrieve the projection from the overlay.
      var overlayProjection = this.getProjection();

      // Retrieve the south-west and north-east coordinates of this overlay
      // in LatLngs and convert them to pixel coordinates.
      // We'll use these coordinates to resize the div.
      var sw = overlayProjection.fromLatLngToDivPixel(this._bounds.getSouthWest());
      var ne = overlayProjection.fromLatLngToDivPixel(this._bounds.getNorthEast());

      // Resize the image's div to fit the indicated dimensions.
      var div = this._div;
      div.style.left = sw.x + 'px';
      div.style.top = ne.y + 'px';
      div.style.width = (ne.x - sw.x) + 'px';
      div.style.height = (sw.y - ne.y) + 'px';
   };
// [END region_drawing]

// [START region_removal]
// The onRemove() method will be called automatically from the API if
// we ever set the overlay's map property to 'null'.
   FloorPlan.prototype.onRemove = function() {
      this._div.parentNode.removeChild(this._div);
      this._div = null;
   };
// [END region_removal]

//export
   exports.FloorPlan = FloorPlan;
})(window, window.google.maps);
