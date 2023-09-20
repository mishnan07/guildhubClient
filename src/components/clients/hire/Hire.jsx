import React from "react";

const Hire = () => {
  return (
    <div>
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
            Post Your Requirement
            <br />& Hire Trusted Professionals
          </h1>

          <div className="flex justify-center space-x-4 mb-4">
            <a
              href="#"
              className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-400"
            >
              Post now!
            </a>
          </div>

          <h1 className="text-4px md:text-lg lg:text-xl font-bold text-gray-700 mb-6">
          Why  this website the best choice for<br />requirement & hiring ?
                    </h1>
          <div className="flex items-center justify-center">
            <img src="data:image/png;base64,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" />
            <p className="text-lg lg:text-xl text-gray-700  px-4 ">
              select trusted professionals based on badged and reviews{" "}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <img src="data:image/png;base64,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"></img>
            <p className="text-lg lg:text-xl text-gray-700  px-4 ">
              you can choose who to interact with let anyone spam you!{" "}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFB0lEQVR4nO2aW2gcVRjHP0q9PvTRt0IfVHCz0aa7SbqZ2cTurtnd7O5MGtkqlVYQ0dAgpCRNIRA3SfXBxiytCNYbPkQThUjSKFjsS4saklb6JOTSIrWiID6oxNaHzDmfnOlsdvaeue2MOH/4vyw7c+b/O998czkD4MqVK1euXLly5cqVZuHzmfulvuFe0j/ylTQweoucOPUPHTqFuj0whoQXq1rixL8lXlwlnDAtcd2H0JO+F+yQ9Mrwi9Lg6K+GAheZvDxUE0AJEF64scmleuoWHDOZnaR/5KOCg89MIJ2aRfrF10hn5pGe1AkgdVQzgLyFCYTMDssBEHX48Szi8jVEiaBadGZOe/jDxwyEV8wJb1he9jR30JPnEP/4syC4ZgDsnGdlb2jmC73Ji92WNTwyOPbL1swXh1+5jvSzBaRjk0iC3aYF0twTOPFHSxqj1Dfcm5s5uexzun0H6WDt7l1XCLyQNh0A6X/1Qq7hqc95p4VX/LH5AAbGf5YBTM0WlL3eg6THDyBe9iJe8iI9HjK5AsRV8wGcGL8jA/jyYn72Pz2v7yCTCcQrHsRrj931FY/8m2kAOGHDdAA017ln5vMAxrP6Zv9sIB9eMT0TMLUKrANwkkGYQzo9p6/bdyUQlxtKAJhdBdYBGFLdvOiZ/TOls79VBVljVfBXIIE3mztxzR9xKIB4svzsq6sgoa8KfmuN44ovvGVHAqDZtsrhc1Uw2aZr5tXhnQmgK4m4pOr8lbzkkStFy75Z2TsHQGcKydFOpEMdSE9zSD9sRjzfVL30i33Vg3jxCaQzPqRvB5COBpH2hpGIcSRBoWRMds7bC+BACun7rdpC6vVyA9L3WpE8mQdRHL7uAGim3frgxb1ipN1BALKB+gN4k3MOAJKOba/BmWXWKNNxBwHgRbnx4WIdesCSB+kLTxWM7QwAvIjkcBTxG6914Re9SI50lozrHAC8iOTZmDUQvmtA8ly07JjOAsBbAOHbBrm6Ko3nPAC8iOTpOOKlRuPhL3vlJlttLGcC4EWk51oNA6Dv7K85jj0ABmq/C8SFvcYrYL7JmQBIrWWsoGDOrTG75rcLDgSQqrGY0RM3rQmSg13OAkC2sYxF+8KmAaDHwg4AMKBtGYu+xpsHYDxoPwCyjdAFAD5oqR5ssQHp67zsWrfQbF//OQBY6QrAnufZk1xU9dYnmpR/K1grUHthr/0AJE7Y0FQBn/gKQ1z1yG93SLJKQ0t2yf/B74sqYMpfcZtNXigHwPyFEYkT1jRVAbsKzDfdfXp7t6VmJy/wwS55G/kRe66p6rYbbclSAP7IDdMBEE6Y1noa1MO3WqIlANb2hWZNByBx3YfsDlvs3/cXrgXkvOqPHDEdAPpeukfixet2h2bnPCv7cjMvh/eFflp/OHYfWKFNLtVjVhD1Mla5IHq96g8/A1aK8MKE0fDFy1hmed0XOQtWCyGzg3DiaSMzb0n4fZG36vKZXE7sayw9PaHcMpZB37S87Ks3RiHNvsmReHFlOzdLxs/50G12nV/3hT9n3f4Huz6VdeXKlSuVdgLALgB4CAB2A8CjANAIAM0AwANAEAA6ACAEABEAiAJADACSimPKb2HlPx3KNryyj0Zln7uVMXYpY9qmBwFgDwD4lQNO2uSQcgx7lGOqix4HgISNoSs5oVSK5Wr8vwNw6inwADisCXqVBsYVNUHW6LbbBNm2bB9sX49Y0QT/BRYZwqLdvg1TAAAAAElFTkSuQmCC" />
            <p className="text-lg lg:text-xl text-gray-700  px-4 ">
              you can put a public review about the work & profession{" "}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hire;
