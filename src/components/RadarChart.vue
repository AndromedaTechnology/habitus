<script lang="ts">
import { Radar, mixins } from "vue-chartjs";
import { Component, Prop, Vue, PropSync } from "vue-property-decorator";

@Component({
  extends: Radar,
  mixins: [mixins.reactiveProp],
})
export default class RadarChart extends Vue {
  @Prop() private chartData!: any;
  @Prop() private options!: any;
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
  public renderChart!: (chartData: any, options: any) => void;
}
</script>
