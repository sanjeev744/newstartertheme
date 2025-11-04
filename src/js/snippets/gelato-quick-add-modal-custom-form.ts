export class GelatoQuickAddModalCustomForm {
  static initializeAll() {
    document
      .querySelectorAll(".gelato-quick-add-modal__product-form")
      .forEach((form) => {
        if ((form as any)._gelatoQuickAddModalCustomForm) return;
        new GelatoQuickAddModalCustomForm(form as HTMLFormElement);
      });
  }

  private form: HTMLFormElement;
  private optionGroups: NodeListOf<HTMLElement>;
  private radios: NodeListOf<HTMLInputElement>;
  private variantInput: HTMLInputElement;
  private feedback: HTMLElement;
  private productData: any;

  constructor(form: HTMLFormElement) {
    this.form = form;
    this.optionGroups = form.querySelectorAll(
      ".gelato-quick-add-modal__option-group"
    );
    this.radios = form.querySelectorAll(".gelato-quick-add-modal__radio");
    this.variantInput = form.querySelector(".gelato-quick-add-modal__variant-id")!;
    this.feedback = form.querySelector(".gelato-quick-add-modal__feedback")!;
    this.productData = this.getProductData();
    this.init();
    (form as any)._gelatoQuickAddModalCustomForm = this;
  }

  private getProductData() {
    // Try to get product JSON from the .sealsubs-target-element
    const el = this.form.querySelector(".sealsubs-target-element");
    if (el && el.getAttribute("data-product")) {
      try {
        return JSON.parse(el.getAttribute("data-product")!);
      } catch {}
    }
    return null;
  }

  private init() {
    this.radios.forEach((radio) => {
      radio.addEventListener("change", () => this.onOptionChange());
    });
    this.form.addEventListener("submit", (e) => this.onSubmit(e));
    this.onOptionChange(); // Set initial variant

    if (
      typeof (window as any).SealSubs !== "undefined" &&
      typeof (window as any).SealSubs.refresh === "function"
    ) {
      (window as any).SealSubs.refresh();
    }
  }

  private onOptionChange() {
    if (!this.productData) return;
    
    // If product has only one variant (no options), use it directly
    if (this.productData.variants.length === 1) {
      const variant = this.productData.variants[0];
      this.variantInput.value = variant.id;
      this.feedback.style.display = "none";
      this.form
        .querySelector(".gelato-quick-add-modal__submit")!
        .removeAttribute("disabled");
      return;
    }
    
    // For products with multiple variants, handle option selection
    const selectedOptions: string[] = [];
    this.optionGroups.forEach((group) => {
      const checked = group.querySelector<HTMLInputElement>(
        ".gelato-quick-add-modal__radio:checked"
      );
      selectedOptions.push(checked ? checked.value : "");
    });
    const variant = this.productData.variants.find((v: any) => {
      return v.options.every(
        (opt: string, i: number) => opt === selectedOptions[i]
      );
    });
    if (variant) {
      this.variantInput.value = variant.id;
      this.feedback.style.display = "none";
      this.form
        .querySelector(".gelato-quick-add-modal__submit")!
        .removeAttribute("disabled");
    } else {
      this.variantInput.value = "";
      this.feedback.textContent = "This combination is unavailable.";
      this.feedback.style.display = "block";
      this.form
        .querySelector(".gelato-quick-add-modal__submit")!
        .setAttribute("disabled", "disabled");
    }
  }

  private onSubmit(e: Event) {
    e.preventDefault();
    const variantId = this.variantInput.value;
    if (!variantId) return;
    const formData = new FormData();
    formData.append("id", variantId);
    formData.append("quantity", "1");
    // Add selling_plan if present (for subscriptions)
    const sellingPlan = (
      this.form.querySelector('[name="selling_plan"]') as HTMLInputElement
    )?.value;
    if (sellingPlan) formData.append("selling_plan", sellingPlan);
    this.setLoading(true);
    fetch("/cart/add.js", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    })
      .then((r) => r.json())
      .then((data) => {
        this.feedback.textContent = "Added to cart!";
        this.feedback.style.display = "block";
        this.setLoading(false);
        // Optionally, trigger cart drawer/notification here
      })
      .catch(() => {
        this.feedback.textContent = "Error adding to cart.";
        this.feedback.style.display = "block";
        this.setLoading(false);
      });
  }

  private setLoading(loading: boolean) {
    const btn = this.form.querySelector(
      ".gelato-quick-add-modal__submit"
    ) as HTMLButtonElement;
    if (loading) {
      btn.setAttribute("disabled", "disabled");
      btn.textContent = "Adding...";
    } else {
      btn.removeAttribute("disabled");
      btn.textContent = "Add to cart";
    }
  }
}
