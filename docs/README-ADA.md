# **ADA Compliance Guide for Web Development and Redesigns**

# **Overview**

ADA compliance is essential for creating accessible websites that serve all users, including those with disabilities. Adhering to these guidelines during development and redesign minimizes accessibility issues and helps us achieve a **UserWay score of 70% or higher**, which we consider a “low-risk” compliance level. This guide covers compliance requirements for **new builds** and **redesigns of existing websites** to ensure we meet these standards effectively.

---

## **1. ADA Compliance Standards Overview**

### **Web Content Accessibility Guidelines (WCAG)**

The Web Content Accessibility Guidelines (WCAG) offer specific standards for ADA compliance. We aim to meet **WCAG 2.1 Level AA** standards, which include:

- **Perceivable:** Content must be available in multiple formats, such as screen reader text alternatives for images.
- **Operable:** The site should be usable with keyboard navigation, and elements must not cause seizures or physical reactions.
- **Understandable:** The content should be readable and predictable in navigation and design.
- **Robust:** Compatibility with assistive technologies and adherence to current and future web standards.

---

## **2. ADA Compliance Checklist for New Website Builds**

When building new websites, developers should follow these best practices to ensure ADA compliance from the ground up:

### **Text and Content Accessibility**

- **Alt Text for Images**: Use descriptive, relevant alternative text for all images. Avoid redundant information in alt text.
- **Video and Audio Transcripts**: Provide text transcripts for audio content and captions for videos.
- **Readable Font Sizes**: Use a minimum font size of 16px for body text to ensure readability.
- **Consistent Heading Structure**: Use `<h1>` through `<h6>` tags sequentially and logically. Start with `<h1>` for the main title and proceed accordingly for subheadings.

### **Keyboard Navigation and Focus Management**

- **Keyboard Accessibility**: Ensure that all interactive elements (buttons, links, forms) are accessible via keyboard-only navigation.
- **Focus Indicators**: Implement clear focus indicators (e.g., borders around focused elements) to help users track their place when navigating with a keyboard.
- **Skip Navigation Links**: Include “Skip to Content” links to help users bypass repetitive navigation and go straight to the main content.

### **Color Contrast and Design Elements**

- **High Contrast Colors**: Maintain a contrast ratio of at least 4.5:1 for text against its background, especially for smaller text.
- **Avoid Relying on Color Alone**: Don’t use color alone to convey information (e.g., don’t make error messages red-only; add text that clarifies the error).
- **Accessible Forms**: Label all form fields clearly, and include placeholders sparingly. Use ARIA labels when needed to assist screen readers.

### **Responsive Design and Screen Reader Compatibility**

- **Responsive Layouts**: Ensure the design is responsive on different screen sizes and orientations, including both portrait and landscape modes.
- **ARIA Roles and Landmarks**: Use ARIA roles (e.g., `role="navigation"`, `role="main"`) to help assistive technologies understand content structure.

### **Interactive Elements and Forms**

- **Accessible Forms**: Use labels, legends, and instructions within form fields. Ensure form fields have enough space between them to improve accessibility for users with motor disabilities.
- **Error Notifications**: Provide clear, descriptive error messages when users interact with forms.

---

## **3. ADA Compliance Checklist for Redesigns of Existing Websites**

For redesigns, the existing site structure can present challenges. Follow these steps to adapt and improve accessibility on redesigned sites:

### **Audit the Current Site**

1. **Run an Initial Accessibility Audit**: Use the [UserWay Accessibility Checker](https://userway.org/accessibility-checker/) to identify existing compliance issues and areas needing attention.
2. **Evaluate for Major Issues**: Identify and prioritize fixing high-risk elements such as images without alt text, missing focus indicators, poor contrast, and inaccessible forms.

### **Update Content Accessibility**

- **Alt Text Verification**: Ensure all images have relevant and accurate alt text that aligns with the redesigned content.
- **Consistent Heading Structure**: Review and adjust heading structures to be logical and sequential. This is especially important if content has been reorganized.

### **Design and Color Contrast Adjustments**

- **Update Colors to Meet Contrast Ratios**: Review and adjust color schemes, ensuring contrast ratios are WCAG-compliant. Test contrast ratios for redesigned UI components to make sure they remain accessible.
- **Consistent Font and Heading Sizes**: Update text sizes, spacing, and alignment as needed to maintain readability on various screen sizes.

### **Improve Keyboard Accessibility and Focus States**

- **Test Interactive Elements**: Ensure buttons, links, and other interactive elements work effectively with keyboard navigation.
- **Add or Update Focus Indicators**: Implement focus indicators if missing or update existing indicators for improved visibility.

### **Test with Assistive Technologies**

- **Screen Reader Compatibility**: Test the redesigned site with a screen reader (such as NVDA or JAWS) to check for compatibility issues.
- **Responsive Behavior Verification**: Verify that the redesigned site maintains accessibility on different screen sizes and orientations.

---

## **4. Testing for ADA Compliance**

To verify ADA compliance:

1. **Run the UserWay Accessibility Checker**: After completing development or redesign, run the [UserWayAccessibility Checker](https://userway.org/accessibility-checker/) on each page to identify any remaining issues.
2. **Aim for a Compliance Score of 70% or Higher**: Our goal is to reach at least a 70% compliance score. This score is considered a low-risk level, reducing the likelihood of ADA-related legal challenges.
3. **Address Issues**: For any identified issues, address them promptly by adjusting the site’s code or design according to the guidelines.

---

## **5. Resources for Developers**

- **WCAG Quick Reference Guide**: [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- **ARIA Roles Guide**: [ARIA Roles Documentation](https://www.w3.org/WAI/PF/aria/roles)

---

## Final thoughts

By adhering to these ADA compliance guidelines during development and redesign, we can significantly reduce the likelihood of accessibility issues post-launch. Remember to:

- Follow the best practices for new builds and redesigns.
- Use the UserWay Accessibility Checker to ensure we meet the goal of a **70% compliance score or higher**.
- Keep accessibility in mind as an integral part of the development and redesign process, not as an afterthought.