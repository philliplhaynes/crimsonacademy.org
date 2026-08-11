export const Statistics = () => {
  interface StatsProps {
    quantity: string;
    description: string;
  }
  const stats: StatsProps[] = [
    { quantity: "#1", description: "in the Southern Province (National Exams)" },
    { quantity: "90.4%", description: "P6 National Exam average, 2024–2025" },
    { quantity: "780+", description: "students, Nursery–Primary 6" },
    { quantity: "3", description: "languages of instruction" },
  ];
  return (
    <section>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {stats.map(({ quantity, description }) => (
          <div key={description} className="space-y-1 text-center px-4 py-8 border-t md:border-l first:border-l-0">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-primary">{quantity}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
