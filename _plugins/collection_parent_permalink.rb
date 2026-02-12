# Adds a :parent placeholder for collection permalinks.
#
# For a file at _projects/wwwh/helix.md with permalink /work/:parent/:name/,
# the generated URL will be /work/wwwh/helix/.

module Jekyll
  class CollectionParentPermalink < Generator
    safe true
    priority :high

    def generate(site)
      site.documents.each do |doc|
        next unless doc.data["permalink"]&.include?(":parent")

        parts = doc.relative_path.split("/")
        next unless parts.length >= 3

        parent = parts[-2]
        doc.data["permalink"] = doc.data["permalink"].gsub(":parent", parent)
      end
    end
  end
end
