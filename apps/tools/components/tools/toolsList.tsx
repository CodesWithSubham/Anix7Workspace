import Section, { CardSection } from "@shared/components/ui/Section";
import { tools, ToolType } from ".";
import { CardButton } from "@shared/components/ui/Button";

export function ToolsList() {
  // Get unique categories automatically
  let categories = Array.from(new Set(tools.map((f) => f.category)));

  // Sort alphabetically and push "Other" to the end
  categories = (categories.filter((c) => c !== "Other").sort() as ToolType["category"][]).concat(
    categories.includes("Other") ? (["Other"] as ToolType["category"][]) : []
  );

  // Group features by category
  const featuresByCategory = categories.reduce((acc, category) => {
    acc[category] = tools.filter((f) => f.category === category);
    return acc;
  }, {} as Record<string, ToolType[]>);

  return categories.map((category) => {
    const features = featuresByCategory[category];
    if (!features || features.length === 0) return null;

    return (
      <Section key={category} title={`${category} Tools`}>
        <CardSection>
          {features.map(({ title, description, image, link, isNew }, i) => (
            <CardButton
              key={i}
              href={link}
              title={title}
              image={image}
              description={description}
              isNew={isNew}
            />
          ))}
        </CardSection>
      </Section>
    );
  });
}

export function FeaturedTools() {
  return (
    <Section title="Our Key Features">
      <CardSection>
        {tools
          .filter((feature) => feature.hot)
          .map(({ title, description, image, link, isNew }, i) => (
            <CardButton
              key={i}
              href={link}
              title={title}
              image={image}
              description={description}
              isNew={isNew}
            />
          ))}
      </CardSection>
    </Section>
  );
}
