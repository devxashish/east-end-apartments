(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var layouts = window.EE_LAYOUTS || [];
  var listings = window.EE_LISTINGS || [];
  var gallery = window.EE_GALLERY || [];
  var layoutById = {};
  layouts.forEach(function (item) {
    layoutById[item.id] = item;
  });

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function arrowIcon() {
    return '<svg class="od-icon od-icon--sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  }

  function closeIcon() {
    return '<svg class="od-icon od-icon--md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  }

  function arrowLeftIcon() {
    return '<svg class="od-icon od-icon--md" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
  }

  function formatArea(value) {
    return value.toLocaleString("en-IN");
  }

  function listingCard(item) {
    var layout = layoutById[item.layoutId];
    if (!layout) return "";
    var modeLabel = item.mode === "sale" ? "For sale" : "For rent";
    var tagClass = item.mode === "sale" ? "listing-tag" : "listing-tag is-rent";
    var balconies = layout.balconies === 1 ? "1 balcony" : layout.balconies + " balconies";
    return (
      '<a class="listing-card" href="#unit-' + item.id + '" data-listing="' + item.id + '">' +
        '<span class="listing-media">' +
          '<span class="' + tagClass + '">' + modeLabel + "</span>" +
          '<img src="' + layout.img + '" alt="' + layout.name + " floor plan" + '" width="' + layout.w + '" height="' + layout.h + '" loading="lazy" decoding="async">' +
        "</span>" +
        '<span class="listing-body">' +
          '<span class="listing-type">' + item.tower + " · " + item.floor + "</span>" +
          '<span class="listing-name">' + layout.name + "</span>" +
          '<span class="listing-price">' + item.price + "<small>" + item.priceSuffix + "</small></span>" +
          '<span class="listing-specs">' +
            "<span>" + formatArea(layout.area) + " sq ft</span>" +
            "<span>" + layout.bhkLabel + "</span>" +
            "<span>" + balconies + "</span>" +
          "</span>" +
          '<span class="listing-foot">View residence ' + arrowIcon() + "</span>" +
        "</span>" +
      "</a>"
    );
  }

  function renderCards(container, items) {
    if (!container) return;
    container.innerHTML = items.map(listingCard).join("");
  }

  function layoutCard(item) {
    return (
      '<button class="layout-card" type="button" data-layout="' + item.id + '">' +
        '<span class="layout-card-media">' +
          '<img src="' + item.img + '" alt="' + item.name + " floor plan" + '" width="' + item.w + '" height="' + item.h + '" loading="lazy" decoding="async">' +
        "</span>" +
        '<span class="layout-card-body">' +
          '<span class="k">' + item.towers + "</span>" +
          '<span class="n">' + item.name + "</span>" +
          '<span class="m">' + formatArea(item.area) + " sq ft · " + item.bhkLabel + "</span>" +
        "</span>" +
      "</button>"
    );
  }

  var header = document.querySelector(".site-header");
  var isHome = document.body.classList.contains("page-home");
  if (header && isHome) {
    var onScroll = function () {
      if (window.scrollY > 40) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var menuBtn = document.querySelector("[data-menu-toggle]");
  var mobileNav = document.getElementById("mobile-nav");
  if (menuBtn && mobileNav && header) {
    var closeMenu = function () {
      mobileNav.hidden = true;
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open menu");
      header.classList.remove("is-open");
      document.body.classList.remove("is-locked");
      if (isHome && window.scrollY <= 40) {
        header.classList.remove("is-scrolled");
      }
    };
    var openMenu = function () {
      mobileNav.hidden = false;
      menuBtn.setAttribute("aria-expanded", "true");
      menuBtn.setAttribute("aria-label", "Close menu");
      header.classList.add("is-open");
      header.classList.add("is-scrolled");
      document.body.classList.add("is-locked");
    };
    menuBtn.addEventListener("click", function () {
      if (mobileNav.hidden) {
        openMenu();
      } else {
        closeMenu();
      }
    });
    mobileNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !mobileNav.hidden) {
        closeMenu();
        menuBtn.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 1080 && !mobileNav.hidden) closeMenu();
    });
  }

  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (revealItems.length) {
    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach(function (el) {
        el.classList.add("is-in");
      });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
      revealItems.forEach(function (el) {
        observer.observe(el);
      });
    }
  }

  function openDialog(dialog) {
    if (!dialog) return;
    dialog.showModal();
    document.body.classList.add("is-locked");
  }

  function closeDialog(dialog) {
    if (!dialog || !dialog.open) return;
    dialog.close();
  }

  document.querySelectorAll("dialog").forEach(function (dialog) {
    dialog.addEventListener("close", function () {
      document.body.classList.remove("is-locked");
    });
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeDialog(dialog);
    });
    dialog.querySelectorAll("[data-close-dialog]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        closeDialog(dialog);
      });
    });
  });

  var featuredContainer = document.getElementById("featured-listings");
  if (featuredContainer) {
    renderCards(
      featuredContainer,
      listings.filter(function (item) {
        return item.featured;
      })
    );
  }

  var listingDialog = document.getElementById("listing-dialog");
  if (listingDialog) {
    var ldImg = listingDialog.querySelector("[data-ld-img]");
    var ldKicker = listingDialog.querySelector("[data-ld-kicker]");
    var ldName = listingDialog.querySelector("[data-ld-name]");
    var ldPrice = listingDialog.querySelector("[data-ld-price]");
    var ldNote = listingDialog.querySelector("[data-ld-note]");
    var ldSpecs = listingDialog.querySelector("[data-ld-specs]");
    var ldRef = listingDialog.querySelector("[data-ld-ref]");
    var ldCta = listingDialog.querySelector("[data-ld-cta]");
    var lastTrigger = null;

    var openListing = function (item, trigger) {
      var layout = layoutById[item.layoutId];
      if (!layout) return;
      lastTrigger = trigger || null;
      ldKicker.textContent = item.mode === "sale" ? "For sale" : "For rent";
      ldName.textContent = layout.name + " · " + item.tower;
      ldPrice.innerHTML = "";
      ldPrice.appendChild(document.createTextNode(item.price + " "));
      var small = document.createElement("small");
      small.textContent = item.priceSuffix;
      ldPrice.appendChild(small);
      ldNote.textContent = item.note;
      ldImg.src = layout.img;
      ldImg.alt = layout.name + " floor plan";
      ldImg.width = layout.w;
      ldImg.height = layout.h;
      ldRef.textContent = "Reference " + item.ref;
      var specData = [
        ["Carpet area", formatArea(layout.area) + " sq ft"],
        ["Layout", layout.bhkLabel],
        ["Floor", item.floor],
        ["Tower", item.tower],
        ["Toilets", String(layout.toilets)],
        ["Balconies", String(layout.balconies)],
        ["Lifts", layout.lifts],
        ["Storeys", layout.storeys]
      ];
      ldSpecs.innerHTML = specData
        .map(function (pair) {
          return '<span class="spec"><span>' + pair[0] + "</span><b>" + pair[1] + "</b></span>";
        })
        .join("");
      ldCta.href =
        "contact.html?interest=" + (item.mode === "sale" ? "buy" : "rent") + "&unit=" + encodeURIComponent(item.ref);
      openDialog(listingDialog);
    };

    document.addEventListener("click", function (event) {
      var card = event.target.closest("[data-listing]");
      if (!card) return;
      event.preventDefault();
      var item = listings.filter(function (entry) {
        return entry.id === card.getAttribute("data-listing");
      })[0];
      if (item) openListing(item, card);
    });

    listingDialog.addEventListener("close", function () {
      if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
    });
  }

  var listingGrid = document.getElementById("listing-grid");
  if (listingGrid) {
    var state = { mode: "all", bhk: "all" };
    var urlParams = new URLSearchParams(window.location.search);
    var pMode = urlParams.get("mode");
    var pBhk = urlParams.get("bhk");
    if (pMode && ["all", "sale", "rent"].indexOf(pMode) !== -1) {
      state.mode = pMode;
    }
    if (pBhk && ["all", "2", "3"].indexOf(pBhk) !== -1) {
      state.bhk = pBhk;
    }
    document.querySelectorAll("[data-mode]").forEach(function (chip) {
      chip.setAttribute("aria-pressed", chip.getAttribute("data-mode") === state.mode ? "true" : "false");
    });
    document.querySelectorAll("[data-bhk]").forEach(function (chip) {
      chip.setAttribute("aria-pressed", chip.getAttribute("data-bhk") === state.bhk ? "true" : "false");
    });

    var countEl = document.getElementById("listing-count");
    var emptyEl = document.getElementById("listing-empty");

    var applyListingFilters = function () {
      var filtered = listings.filter(function (item) {
        var layout = layoutById[item.layoutId];
        if (!layout) return false;
        if (state.mode !== "all" && item.mode !== state.mode) return false;
        if (state.bhk !== "all" && String(layout.bhk) !== state.bhk) return false;
        return true;
      });
      renderCards(listingGrid, filtered);
      listingGrid.hidden = filtered.length === 0;
      if (emptyEl) emptyEl.hidden = filtered.length !== 0;
      if (countEl) {
        countEl.innerHTML = "<b>" + filtered.length + "</b> " + (filtered.length === 1 ? "residence" : "residences");
      }
    };

    document.querySelectorAll("[data-mode]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        state.mode = chip.getAttribute("data-mode");
        document.querySelectorAll("[data-mode]").forEach(function (other) {
          other.setAttribute("aria-pressed", other === chip ? "true" : "false");
        });
        applyListingFilters();
      });
    });

    document.querySelectorAll("[data-bhk]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        state.bhk = chip.getAttribute("data-bhk");
        document.querySelectorAll("[data-bhk]").forEach(function (other) {
          other.setAttribute("aria-pressed", other === chip ? "true" : "false");
        });
        applyListingFilters();
      });
    });

    var resetFilters = document.getElementById("reset-filters");
    if (resetFilters) {
      resetFilters.addEventListener("click", function () {
        state.mode = "all";
        state.bhk = "all";
        document.querySelectorAll("[data-mode]").forEach(function (chip) {
          chip.setAttribute("aria-pressed", chip.getAttribute("data-mode") === "all" ? "true" : "false");
        });
        document.querySelectorAll("[data-bhk]").forEach(function (chip) {
          chip.setAttribute("aria-pressed", chip.getAttribute("data-bhk") === "all" ? "true" : "false");
        });
        applyListingFilters();
      });
    }

    applyListingFilters();
  }

  var layoutGrid = document.getElementById("layout-grid");
  if (layoutGrid) {
    var layoutState = { bhk: "all" };
    var layoutCount = document.getElementById("layout-count");

    var applyLayoutFilters = function () {
      var filtered = layouts.filter(function (item) {
        return layoutState.bhk === "all" || String(item.bhk) === layoutState.bhk;
      });
      layoutGrid.innerHTML = filtered.map(layoutCard).join("");
      if (layoutCount) {
        layoutCount.innerHTML = "<b>" + filtered.length + "</b> " + (filtered.length === 1 ? "layout" : "layouts");
      }
    };

    document.querySelectorAll("[data-layout-bhk]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        layoutState.bhk = chip.getAttribute("data-layout-bhk");
        document.querySelectorAll("[data-layout-bhk]").forEach(function (other) {
          other.setAttribute("aria-pressed", other === chip ? "true" : "false");
        });
        applyLayoutFilters();
      });
    });

    applyLayoutFilters();
  }

  var layoutDialog = document.getElementById("layout-dialog");
  if (layoutDialog) {
    var lyImg = layoutDialog.querySelector("[data-ly-img]");
    var lyName = layoutDialog.querySelector("[data-ly-name]");
    var lySummary = layoutDialog.querySelector("[data-ly-summary]");
    var lySpecs = layoutDialog.querySelector("[data-ly-specs]");
    var lyCta = layoutDialog.querySelector("[data-ly-cta]");
    var lyTrigger = null;

    var openLayout = function (item, trigger) {
      lyTrigger = trigger || null;
      lyName.textContent = item.name;
      lySummary.textContent = item.summary;
      lyImg.src = item.img;
      lyImg.alt = item.name + " floor plan";
      lyImg.width = item.w;
      lyImg.height = item.h;
      var pairs = [
        ["Area", formatArea(item.area) + " sq ft"],
        ["Bedrooms", item.bhkLabel],
        ["Toilets", String(item.toilets)],
        ["Balconies", String(item.balconies)],
        ["Towers", item.towers],
        ["Storeys", item.storeys],
        ["Lifts", item.lifts],
        ["Flats per floor", item.density]
      ];
      lySpecs.innerHTML = pairs
        .map(function (pair) {
          return '<span class="spec"><span>' + pair[0] + "</span><b>" + pair[1] + "</b></span>";
        })
        .join("");
      lyCta.href = "contact.html?interest=buy&layout=" + encodeURIComponent(item.name);
      openDialog(layoutDialog);
    };

    document.addEventListener("click", function (event) {
      var trigger = event.target.closest("[data-layout]");
      if (!trigger) return;
      var item = layouts.filter(function (entry) {
        return entry.id === trigger.getAttribute("data-layout");
      })[0];
      if (item) openLayout(item, trigger);
    });

    layoutDialog.addEventListener("close", function () {
      if (lyTrigger && document.contains(lyTrigger)) lyTrigger.focus();
    });
  }

  var galleryGrid = document.getElementById("gallery-grid");
  var galleryDialog = document.getElementById("gallery-dialog");
  if (galleryGrid && galleryDialog && gallery.length) {
    galleryGrid.innerHTML = gallery
      .map(function (item, index) {
        return (
          '<button class="gallery-item" type="button" data-gallery="' + index + '">' +
            '<img src="' + item.src + '" alt="' + item.title + " — " + item.caption + '" width="' + item.w + '" height="' + item.h + '" loading="lazy" decoding="async">' +
            "<span>" + item.title + "</span>" +
          "</button>"
        );
      })
      .join("");

    var gImg = galleryDialog.querySelector("[data-g-img]");
    var gTitle = galleryDialog.querySelector("[data-g-title]");
    var gCaption = galleryDialog.querySelector("[data-g-caption]");
    var gCount = galleryDialog.querySelector("[data-g-count]");
    var gIndex = 0;
    var gTrigger = null;

    var showGallery = function (index) {
      gIndex = (index + gallery.length) % gallery.length;
      var item = gallery[gIndex];
      gImg.src = item.src;
      gImg.alt = item.title + " — " + item.caption;
      gImg.width = item.w;
      gImg.height = item.h;
      gTitle.textContent = item.title;
      gCaption.textContent = item.caption;
      gCount.textContent = gIndex + 1 + " / " + gallery.length;
    };

    galleryGrid.addEventListener("click", function (event) {
      var trigger = event.target.closest("[data-gallery]");
      if (!trigger) return;
      gTrigger = trigger;
      showGallery(Number(trigger.getAttribute("data-gallery")));
      openDialog(galleryDialog);
    });

    galleryDialog.querySelector("[data-g-prev]").addEventListener("click", function () {
      showGallery(gIndex - 1);
    });
    galleryDialog.querySelector("[data-g-next]").addEventListener("click", function () {
      showGallery(gIndex + 1);
    });
    galleryDialog.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showGallery(gIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        showGallery(gIndex + 1);
      }
    });
    galleryDialog.addEventListener("close", function () {
      if (gTrigger && document.contains(gTrigger)) gTrigger.focus();
    });
  }

  var form = document.getElementById("enquiry-form");
  if (form) {
    var interestSelect = document.getElementById("interest");
    var params = new URLSearchParams(window.location.search);
    var interestParam = params.get("interest");
    if (interestSelect && interestParam) {
      var allowed = ["buy", "rent", "sell", "general"];
      if (allowed.indexOf(interestParam) !== -1) interestSelect.value = interestParam;
    }
    var unitParam = params.get("unit");
    var layoutParam = params.get("layout");
    var messageField = document.getElementById("message");
    if (messageField && (unitParam || layoutParam)) {
      if (unitParam) {
        messageField.value = "I would like to know more about residence " + unitParam + ".";
      } else if (layoutParam) {
        messageField.value = "I would like to know more about the " + layoutParam + " layout.";
      }
    }

    var fields = [
      { id: "name", validate: function (value) { return value.trim().length >= 2 ? "" : "Please enter your full name."; } },
      {
        id: "phone",
        validate: function (value) {
          var digits = value.replace(/[\s\-()]/g, "");
          return /^(?:\+?91)?[6-9]\d{9}$/.test(digits) ? "" : "Enter a 10-digit Indian mobile number.";
        }
      },
      {
        id: "email",
        validate: function (value) {
          if (!value.trim()) return "";
          return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? "" : "Enter a valid email address, or leave this empty.";
        }
      },
      { id: "interest", validate: function (value) { return value ? "" : "Please choose what your enquiry is about."; } }
    ];

    var errorFor = function (id) {
      return document.getElementById(id + "-error");
    };

    var setFieldError = function (id, message) {
      var input = document.getElementById(id);
      var error = errorFor(id);
      var field = input ? input.closest(".field") : null;
      if (!input || !field) return;
      if (message) {
        field.classList.add("has-error");
        input.setAttribute("aria-invalid", "true");
        if (error) {
          error.textContent = message;
          error.hidden = false;
        }
      } else {
        field.classList.remove("has-error");
        input.removeAttribute("aria-invalid");
        if (error) {
          error.textContent = "";
          error.hidden = true;
        }
      }
    };

    var validateField = function (config) {
      var input = document.getElementById(config.id);
      if (!input) return "";
      var message = config.validate(input.value);
      setFieldError(config.id, message);
      return message;
    };

    fields.forEach(function (config) {
      var input = document.getElementById(config.id);
      if (!input) return;
      input.addEventListener("blur", function () {
        validateField(config);
      });
      input.addEventListener("input", function () {
        if (input.getAttribute("aria-invalid") === "true") validateField(config);
      });
      input.addEventListener("change", function () {
        if (input.getAttribute("aria-invalid") === "true") validateField(config);
      });
    });

    var summary = document.getElementById("form-summary");
    var success = document.getElementById("enquiry-success");
    var submitBtn = form.querySelector('button[type="submit"]');
    var submitDefault = submitBtn ? submitBtn.innerHTML : "";

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var problems = [];
      fields.forEach(function (config) {
        var message = validateField(config);
        if (message) problems.push({ id: config.id, message: message });
      });

      if (summary) {
        if (problems.length) {
          summary.innerHTML =
            "<strong>Please check " + problems.length + (problems.length === 1 ? " field" : " fields") + " below.</strong>" +
            problems
              .map(function (problem) {
                return '<a href="#' + problem.id + '">' + problem.message + "</a>";
              })
              .join("");
          summary.hidden = false;
        } else {
          summary.hidden = true;
          summary.innerHTML = "";
        }
      }

      if (problems.length) {
        var first = document.getElementById(problems[0].id);
        if (first) first.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }

      window.setTimeout(function () {
        form.hidden = true;
        if (summary) summary.hidden = true;
        if (success) {
          success.hidden = false;
          var heading = success.querySelector("h2");
          if (heading) {
            heading.setAttribute("tabindex", "-1");
            heading.focus();
          }
          success.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
        }
      }, 650);
    });

    var again = document.getElementById("send-another");
    if (again) {
      again.addEventListener("click", function () {
        form.reset();
        fields.forEach(function (config) {
          setFieldError(config.id, "");
        });
        if (summary) {
          summary.hidden = true;
          summary.innerHTML = "";
        }
        if (success) success.hidden = true;
        form.hidden = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitDefault;
        }
        var firstInput = document.getElementById("name");
        if (firstInput) firstInput.focus();
      });
    }
  }
})();



