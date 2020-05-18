<script lang="ts">
import { Doughnut, mixins } from "vue-chartjs";
import { Component, Prop, Vue, PropSync } from "vue-property-decorator";

@Component({
  extends: Doughnut,
  mixins: [mixins.reactiveProp]
})
export default class DoughnutChart extends Vue {
  @Prop() private chartData!: any;
  @Prop() private options!: any;
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
  public renderChart!: (chartData: any, options: any) => void;
}
</script>
